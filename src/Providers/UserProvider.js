import React , {createContext, useState}from 'react'
import {fireAuth} from "../FireBase/FireBase";
import {getUserData} from "../FireBase/RealTimeDb";

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
    fireAuth.onAuthStateChanged(async (user) => {
        if (user) {
            console.log("loged user is : ", user);
            await getUserData(user);
            setUser(user);
        } else {
            console.log("user is null");
        }
      });

    return (
        <div>
            <userContext.Provider value={user} >
                {children}
            </userContext.Provider>
        </div>
    )
}

export {UserProvider, userContext};
