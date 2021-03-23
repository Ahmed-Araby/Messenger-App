import {firebase} from "./FireBase";


async function googleSignIn()
{
    var provider = new firebase.auth.GoogleAuthProvider();
    try{
        let result = await firebase.auth().signInWithPopup(provider)
        console.log("successfule sign in : ", result);
        return result;
    }
    catch (err){
        console.log("sign in failed : ", err);
        return null;
    }
    
    return null;
}

export {googleSignIn};