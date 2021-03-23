/**rfce */

import React, {useContext} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import "../Css/message.css";

import {userContext} from "../Providers/UserProvider"

function Message({msg}) {
    const sender_id = msg.sender_id;
    const userName = msg.userName || "UnKnown";
    const text = msg.text;
    const user = useContext(userContext);

    return (
        <Card >
            <CardContent className={"message " + (sender_id==user.uid?"myMessage":"")}>
            {userName}:
                <Typography                             
                            variant='h5'
                            component='h2'
                            gutterBottom>
                    {text}
                </Typography>
            </CardContent>
        </Card>
    )
}

export {Message};
