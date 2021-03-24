import React , {useState, useEffect, useContext} from 'react'
import GoogleButton from 'react-google-button'

import {userContext} from "../Providers/UserProvider";
import {getChannels} from "../FireBase/RealTimeDb";

import {CreateChannel} from './Forms/CreateChannel';
import {JoinChannel} from "./Forms/JoinChannel";
import {ChannelCard} from "./ChannelCard";

function Home(props) {
    const [channels, setChannels] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const user = useContext(userContext);
    const {history} = props;

    useEffect(async function(){
        let tmpChannels = await getChannels(user, pageNum); // object of channels.
        console.log("---------- channels ",  tmpChannels);
        setChannels((chns)=>{
            // why heck I did this !!!???
            let newChns = [];
            for(const prop in tmpChannels)
                newChns.push(tmpChannels[[prop]]);
            return newChns;
        });
    }, []);

    const addChannel = (newChannel)=>{
        for(const ch of channels)
            if(ch.id == newChannel.id) return ;            

        setChannels((channels)=>{
            return [...channels, newChannel];
        })
    }

    return (
        <div>
         <CreateChannel />
         <br></br>
         <br></br>
         <JoinChannel addChannel={addChannel}/>

         <br></br>
         <br></br>
         {
            channels.map(chn=> {
                return(
                    <>
                    <ChannelCard channel_name={chn.name}
                                 channel_id={chn.id}/>
                    <br></br> <br></br>
                    </>
                )
            })
        }
        </div>
    )
}

export {Home};
