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

async function channelExists_id(channel_id)
{
    try{
        let snapshot = await RealTimeDB.ref('channels')
            .orderByKey() // keys are already indexed
            .equalTo(channel_id)
            .get();
        return snapshot;
    }
    catch (err){
        throw err;
    }
}

export async function userHasChannel_name(user, channelName)
{ 
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

async function attachChannel(channelData, userId)
{
    // may be we need to check if we already attached to this channel
    try{
        await RealTimeDB.ref('users/' + userId + "/channels/" + channelData.id).set(channelData);
    }
    catch (err){
        throw err;
    }
}

async function addChannel(channel_name, user_id)
{
    try{
        const key = await RealTimeDB.ref('channels').push().key;
        let newChannel = {
            name:channel_name, 
            timestamp:Date.now(), 
            channel_id:key,
            users:{
                [user_id]:user_id
            }
        };
        await RealTimeDB.ref('channels/'+key).set(newChannel);
        return key;
    }
    catch (err){
        /**
         * is it better to catch the error and rethrow it or
         * just leave it propogate.
         */
        throw err;
    }
}
export {getMessages, RealTimeDB};
export {getUserData, getChannels};
export {attachChannel, channelExists_id};
export {addChannel};