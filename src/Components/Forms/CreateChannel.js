import React , {useState, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {RealTimeDB, RealTimeDb} from "../../FireBase/FireBase";
import {userContext} from "../../Providers/UserProvider";
import {addChannel} from "../../FireBase/RealTimeDB/RTDB_channelLevel";
import {userHasChannel_name,
        attachChannel}  from "../../FireBase/RealTimeDB/RTDB_userLevel";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export function CreateChannel() {
  const classes = useStyles();
  const [channelName, set_channelName] = useState();
  const user = useContext(userContext);

  const createChannel = async (e)=>{
    try{
        let snapshot = await userHasChannel_name(user, channelName);
        if(!snapshot.val()){
            // create channel in the channels document.
            let key = await addChannel(channelName, user.uid);
            let newChannel = {
                id:key, 
                name:channelName   
            };
            // attach channel for the user.
            await attachChannel(newChannel, user.uid); //RealTimeDB.ref('users/' + user.uid + "/channels/"+key).set(newChannel);
            alert("channel created successfuly ");
        }
        else{
            // till the user
            alert("You already have channel with the same name");
        }
    }
    catch (err){ 
        console.log("failed to create the channel ", err)
        alert("failed to create the channel");
    }
    return ;
}

  return (
    <form  className={classes.root} noValidate autoComplete="off">

        <div>
        
        <TextField
          required
          id="channel_name"
          label="Channel Name"
          value={channelName}
          onChange={(e)=> set_channelName(e.target.value)}
          variant="filled"
        />

        </div>

        <Button variant="contained"
                 color="primary" 
                 onClick={()=>{
                     createChannel()
                 }}>
            Create Channel
        </Button>

    </form>


  );
}
