import React, {useState, useEffect, useContext} from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {getMessages, RealTimeDB} from "../FireBase/RealTimeDb"
import {Message} from './Message';

import {userContext} from "../Providers/UserProvider"

export  function Channel(props) {
    const user = useContext(userContext);

    const [message, setMessage] = useState('');
    const [messagesList, setMessagesList] = useState([]);

    const match = props.match;
    const message_limit = 100;
    
    const handleWriteMessage = (event)=>{
        setMessage(event.target.value);
    }

    const handleRecieveMessage = ()=>{
        // observer only the latest new message in the channel.
        let channel_id =  match.params['channel_id'];        
        RealTimeDB.ref("channels/" + channel_id + "/" +"messages")
        .limitToLast(1)
        .on('child_added', function(snapshot, backRef){
            let new_message = snapshot.val();
            let last_message = null;
            let length = messagesList.length;
            
            if(length > 0)
                last_message = messagesList[length-1];
            if(last_message &&
                last_message.sender_id == new_message.sender_id &&
                 last_message.timeStamp == new_message.timeStamp)
                return ; // same copy of the message
            
            setMessagesList((prv)=>{
                return [...prv, new_message]; 
            });
        })
    }

    const handleSendMessage = (event)=>{

        let channel_id =  match.params['channel_id'];   
        let message_id = Date.now().toString(10) + "_" + user.uid;     
        const new_message = {  sender_id:user.uid,
                                    userName:user.userName || "unKnown",
                                    text:message,
                                    message_id:message_id,
                                    timeStamp:Date.now()};
        /** this way messages will always be in the right order */
        let key = RealTimeDB.ref("channels/" + channel_id  + "/messages").push().key;
        RealTimeDB.ref("channels/" + channel_id  + "/messages/" + key).set(new_message);
    }

    useEffect(() => {
        /** load last 100 message int the channel */
        let channel_id =  match.params['channel_id'];        
        let channel_messages_ref = RealTimeDB.ref("channels/" + channel_id + "/" +"messages");
        channel_messages_ref.limitToLast(message_limit).get()
        .then(function(snapshot){
            if(snapshot.exists)
            {
                let tmpMessagesList = []
                for(const prop in snapshot.val()){
                    tmpMessagesList.push(snapshot.val()[[prop]]);
                }
                setMessagesList(tmpMessagesList);
            }
            else{
                console.log("there is no snapshot ")
            }
        })
        .catch(err=> console.log("failed to load initial messages ", err));

        handleRecieveMessage(); // register the observer for the last message.
    }, [])

    return (
        <div>
        
        {
            messagesList.map((msg)=> <Message key={msg.message_id} msg={msg}/> )        
        }

        <FormControl>
            <InputLabel htmlFor="my-input">Message</InputLabel>

            <Input id="my-input" 
                   aria-describedby="my-helper-text"
                   value={message}
                   onChange={handleWriteMessage} />

            <Button variant="contained" 
                    color="primary"
                    disabled={message==''} 
                    onClick={handleSendMessage}>
            Send Message </Button>
        </FormControl>

        </div>
    )
}
