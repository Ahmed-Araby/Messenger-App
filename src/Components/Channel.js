import React, {useState} from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import {Message} from './Message';

export  function Channel() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{userId:2, userName:"Ahmed Araby", text:"Hi"},
                                                {userId:3, userName:"Ahmed Araby2", text:"Hi man"}]);
    
    const handleWriteMessage = (event)=>{
        setMessage(event.target.value);
    }

    const handleSendMessage = (event)=>{
        setMessages([...messages, 
                     {userId:"Bc3dthTT8HhEbrbg6uHz1TAYsLI3", userName:"unKnown", text:message}
                    ]);
    }
    
    return (
        <div>
        
        {
            messages.map((msg)=> <Message key={msg.userId} msg={msg}/> )        
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
