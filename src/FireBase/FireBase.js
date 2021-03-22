// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_OUIyxfZIFdGyrl3JgOo8I-8VylYCY60",
    authDomain: "facebook-messengr-clone.firebaseapp.com",
    projectId: "facebook-messengr-clone",
    storageBucket: "facebook-messengr-clone.appspot.com",
    messagingSenderId: "823056108528",
    appId: "1:823056108528:web:4a4e595bd99202a7c8ab35"
};


  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fireAuth = firebase.auth();

export {fireAuth, firebase};