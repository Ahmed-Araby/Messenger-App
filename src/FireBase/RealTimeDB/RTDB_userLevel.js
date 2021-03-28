import { userContext } from "../../Providers/UserProvider";
import {RealTimeDB} from "../FireBase";
import {deleteChannel} from "./RTDB_channelLevel";

export async function getUserData(user)
{ // user level
    // max 2 levels of recursion.
    try{
        let user_id = user.uid;
        let snapshot = await RealTimeDB.ref('users/' + user_id).get();
        if(snapshot.val())
            return snapshot.val();
        else{
            await saveUserData(user);
            await getUserData(); // could cuz info loop !!!.
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

export async function userHasChannel_id(user, channelId)
{ /** userLevel */
    try{
        let snapshot = await RealTimeDB.ref('users/' + user.uid + "/channels/")
        .orderByKey()
        .equalTo(channelId)
        .get();
        console.log("from user has channel id : ", snapshot.val());
        return (snapshot.val() ? true : false) ;  //  could this return empty object. !!!!????
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

async function getRefs(ref)
{
    let snapshot = await ref.get();
    snapshot.forEach(child => {
        console.log("ref is :", child.ref);
    });
} 


export async function leaveChannel(user, channelId)
{
    
    try{
        let userChannelRef = 'users/' + user.uid + "/channels/" + channelId;
        let channelUserRef = 'channels/' + channelId + "/users/" + user.uid;
        let updates = {[userChannelRef]:null,
                        [channelUserRef]:null}; 
        console.log("updates", updates);
        await RealTimeDB.ref().update(updates);
        alert("sucess 5");

        // delete the channel if it has no more users.
        RealTimeDB.ref('channels/' + channelId)
        .transaction((channel)=>{
            if(channel){
                if(channel.users)
                    return channel;
                return null; // delete channel.
            }
            return channel;
        });
        return true;
    }
    catch (err){
        throw err;
    }
}