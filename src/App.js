import React, {useContext} from 'react'
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Home} from "./Components/Home"
import {SignIn}  from "./Components/Auth/SignIn";
import { Channel } from "./Components/Channel";
import {ProtectedRoute} from "./Components/ProtectedRoute";
import {userContext, UserProvider} from "./Providers/UserProvider"

function App() {
  const user = useContext(userContext);
  //console.log("user from app --- ", user);

  return (
    <BrowserRouter>
      <Switch>
        {!user && <Route path='/signin'><SignIn/></Route>}

        <ProtectedRoute path="/home" Component={Home}/>
        <ProtectedRoute path="/channel" Component={Channel}/>
        
        {user && <Route><Home/></Route>}
      </Switch>
    </BrowserRouter>
  );
}
export default App;
