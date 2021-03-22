import React, {useContext} from 'react'
import { Channel } from "./Components/Channel";

import './App.css';

import {Home} from "./Components/Home"
import {SignIn}  from "./Components/Auth/SignIn";

import {userContext, UserProvider} from "./Providers/UserProvider"


function App() {
  let user = useContext(userContext);
  console.log("user from app --- ", user);
  return (    
    
    <div>
    {
      !user && <SignIn/>
    }
    
    {
      user && 
      (
        <>
        <Home></Home>
        <Channel/>
        </>
      )
    }            
    </div>

  );
}
export default App;
