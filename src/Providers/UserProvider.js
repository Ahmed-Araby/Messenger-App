import React , {createContext, useState}from 'react'
import {fireAuth} from "../FireBase/FireBase";
import {getUserData} from "../FireBase/RealTimeDB/RTDB_userLevel";

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
    fireAuth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
            console.log("loged user from AUth is : ", authUser);
            let userData = await getUserData(authUser);
            console.log("user Data from RTDB is : ", userData);
            /** without this checking 
             * evry time we are assigning new reference to the user state variable 
             * which cuz this component to rerender 
             * which will triger this observer call back function
             * which will cuz the inf loop for updating the user 
             * 
             * 
             * but why authUser alone in setUser is not considered as new reference !!????
             */
            if(!user)
                setUser({...authUser, ...userData});
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
