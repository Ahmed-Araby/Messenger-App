import {RealTimeDB} from "../FireBase";

export async function getMessages()
{


}


export async function addUserToChannel(user, channelId)
{
    try{
        await RealTimeDB.ref('channels/' + channelId + '/users').update({[user.uid]:user.uid})
    }
    catch(err){
        throw err;
    }
}
export async function deleteChannel(user, channelId)
{
    try{
        await RealTimeDB.ref('channels')
                    .orderByKey()
                    .equalTo(channelId)
                    .remove();
    }
    catch (err){
        throw err;
    }
}

export async function channelExists_id(channel_id)
{ // channel level
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

export async function addChannel(channel_name, user_id)
{ /**channel Level */
    // user_id is the user that created the channel.
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



export {RealTimeDB};