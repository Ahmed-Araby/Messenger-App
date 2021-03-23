import {RealTimeDB} from "./FireBase";

async function getMessages()
{


}

async function getUserData(user)
{
    try{
        let user_id = user.uid;
        let snapshot = await RealTimeDB.ref('users/' + user_id).get();
        if(snapshot.val())
            return snapshot.val();
        else{
            await saveUserData(user);
            getUserData(); // could cuz info loop !!!.
            return ;
        }
    }
    catch(err){
        console.log("failure", err);
    }
}

async function saveUserData(user)
{
    try{
        let user_id = user.uid;
        let new_user = {userName:user.displayName || "UnKnown", 
                        email:user.email, 
                        channels:{}, 
                        user_id:user_id};
        await RealTimeDB.ref('users/' + user_id).set(new_user);
    }
    catch(err){
        console.log("save user data failed ");
        throw err;
    }
    return ;
}

async function getChannels(user, pageNum)
{
    let channels = await RealTimeDB.ref('users/' + user.uid + "/channels").get();
    return channels.val();
}

export {getMessages, RealTimeDB};
export {getUserData, getChannels};