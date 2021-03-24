import React , {useState, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {RealTimeDB, RealTimeDb} from "../../FireBase/FireBase";
import {userContext} from "../../Providers/UserProvider";
import {attachChannel, channelExists_id} from "../../FireBase/RealTimeDb";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export function JoinChannel({addChannel}) {
  const classes = useStyles();
  const [channelId, set_channelId] = useState();
  const user = useContext(userContext);

  const joinChannel = async (e)=>{
    // make sure that there a channel with this id
    try{
        let snapshot = await channelExists_id(channelId);
        if(snapshot.val()){
            let channel = snapshot.val()[channelId]; 
            let channelData ={
                name:channel.name, 
                id:channel.channel_id
            };
            await attachChannel(channelData, user.uid);
            addChannel(channelData); // put the channel on the home list of channels.
            alert("You Joined Channel ", channel.name);
        }
        else{
            alert("there is no channel with this ID: ", channelId);
        }
    }

    catch (err){ 
        console.log("failed to Join the channel", err)
        alert("failed to Join the Channel with ID : ", channelId);
    }
    return ;
}

  return (
    <form  className={classes.root} noValidate autoComplete="off">

        <div>
        
        <TextField
          required
          id="channel_id"
          label="channel Id"
          value={channelId}
          onChange={(e)=> set_channelId(e.target.value)}
          variant="filled"
        />

        </div>

        <Button variant="contained"
                 color="primary" 
                 onClick={()=>{
                     joinChannel()
                 }}>
            Join Channel.
        </Button>

    </form>

  );
}
