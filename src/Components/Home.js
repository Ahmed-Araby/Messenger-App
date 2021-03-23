import React from 'react'
import GoogleButton from 'react-google-button'

function Home(props) {
    const {history} = props;
    const handleChooseChannel = (e)=>{
        let cid = "1234";
        history.push('/channel/'+cid);
    }
    return (
        <div>
            <h1> Messenger App </h1>
            <button onClick={handleChooseChannel}> choose channel </button>
        </div>
    )
}

export {Home};
