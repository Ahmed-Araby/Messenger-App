import React , {useState, useEffect, useContext} from 'react'
import GoogleButton from 'react-google-button'

import {userContext} from "../Providers/UserProvider";
import {getChannels} from "../FireBase/RealTimeDb";

function Home(props) {
    const [channels, setChannels] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const user = useContext(userContext);
    const {history} = props;

    const handleChooseChannel = (e, channel_id)=>{
        history.push('/channel/'+channel_id);
    }

    useEffect(async function(){
        let tmpChannels = await getChannels(user, pageNum); // object of channels.
        console.log("---------- channels ",  tmpChannels);
        setChannels((chns)=>{
            let newChns = [];
            for(const prop in tmpChannels)
                newChns.push(tmpChannels[[prop]]);
            return newChns;
        });
    }, []);


    return (
        <>
        {
            channels.map(chn=> {
                return(
                    <>
                        <button onClick={(e)=>{
                            handleChooseChannel(e, chn.id);
                        }}>{chn.name}</button>
                        <br></br> <br></br>
                    </>
                )
            })
        }
        </>
    )
}

export {Home};
