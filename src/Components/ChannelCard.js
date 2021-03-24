import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border:"2px solid black"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    color:"white"
  },
  pos: {
    marginBottom: 12,
    color:"white"
  },
  CardActions:{
      color:"white",
  },
  CardContent:{
      backgroundColor:"#000000"
  }
});

export function ChannelCard({channel_name, channel_id}) {
  const classes = useStyles();
  const history = useHistory();

  const handleLeaveChannel = (e, channel_id)=>{
      alert("Leave Channel");
  }

  const handleOpenChannel = (e, channel_id)=>{
      history.push('/channel/'+channel_id);
  }

  return (
    <Card className={classes.root}>
      
      <CardContent className={classes.CardContent}>

        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Channel Name: {channel_name}
        </Typography>
        

        <Typography className={classes.pos} color="textSecondary">
          Channel Id: {channel_id}
        </Typography>
        
      </CardContent>


      <CardActions className={classes.CardActions}> 
        <Button 
            variant="contained"
            color="primary"
            onClick={(e)=>handleOpenChannel(e, channel_id)}
        >
            Open Channel
        </Button>

        <Button variant="contained" color="secondary"
            size="small"
            onClick={(e)=>{
                handleLeaveChannel(e, channel_id)
         }} 
        >
        Delete Channel
        </Button>
      </CardActions>

    </Card>
  );
}
