import React , {createContext, useState}from 'react'
import {fireAuth} from "../FireBase/FireBase";
/**
 * this context is an object 
 * userContext.provider is a property of this object 
 * and it is a react component.
 */
const userContext = createContext(null); 
userContext.displayName = "userProvider"; // name in DevTools

function UserProvider({children}) {
    const [user, setUser] = useState(null);

    // authentication state observer.
    fireAuth.onAuthStateChanged((user) => {
        if (user) {
            console.log("loged user is : ", user);
            setUser(user);
        } else {
            console.log("user is null");
        }
      });

    return (
        <div>
            <userContext.Provider value={user || {userId:1, userName:"ahmed Araby"}} >
                {children}
            </userContext.Provider>
        </div>
    )
}

export {UserProvider, userContext};
