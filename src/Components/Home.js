import React from 'react'
import GoogleButton from 'react-google-button'

import {googleSignIn} from "../FireBase/Auth";

function Home() {

    return (
        <div>
            <button onClick={()=>{
                googleSignIn();
            }}>
            sing in 
             </button>            
        </div>
    )
}

export {Home};
