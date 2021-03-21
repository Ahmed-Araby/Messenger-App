/**rfce */

import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import "../Css/message.css";
function Message({msg}) {
    const userId = msg.userId;
    const userName = msg.userName;
    const text = msg.text;

    return (
        <Card >
            <CardContent className={"message " + (userId==3?"myMessage":"")}>
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
