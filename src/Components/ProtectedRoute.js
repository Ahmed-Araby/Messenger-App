import React, {useContext} from 'react'
import { Route, Redirect } from "react-router-dom";

import {userContext} from "../Providers/UserProvider";

function ProtectedRoute({path, Component, redirectPath="/signin", ...props}) { // Component have to start with capital 
    const user = useContext(userContext);
    
    return (
        <Route path={path}
               render={ (routeProps)=>{
                return (
                    user? <Component {...props} {...routeProps}/> 
                    :
                    <Redirect to={redirectPath}/> 
                )
                }}
        >        
        </Route>        
    )
}

export {ProtectedRoute};
