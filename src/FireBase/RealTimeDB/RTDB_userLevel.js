import {RealTimeDB} from "../FireBase";

export async function getUserData(user)
{ // user level
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

export async function saveUserData(user)
{ // user level
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


export async function getChannels(user, pageNum)
{ // user level
    let channels = await RealTimeDB.ref('users/' + user.uid + "/channels").get();
    return channels.val();
}

export async function userHasChannel_name(user, channelName)
{ /** userLevel */
    try{
        let snapshot = await RealTimeDB.ref('users/' + user.uid + "/channels/")
        .orderByChild('name')
        .equalTo(channelName)
        .get();
        return snapshot;
    }
    catch (err){
        throw err;
    }
}

export async function attachChannel(channelData, userId)
{/**UserLevel */

    // may be we need to check if we already attached to this channel
    try{
        await RealTimeDB.ref('users/' + userId + "/channels/" + channelData.id).set(channelData);
    }
    catch (err){
        throw err;
    }
}
