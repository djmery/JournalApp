// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
    VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERING,
    VITE_APPID,
    VITE_MEASUREMENTID,
} = getEnvironments();


//console.log(import.meta.env);
//console.log(process.env);

// Your web app's Firebase configuration
//dev - prod
// const firebaseConfig = {
//     apiKey: "AIzaSyDErnzB2fu028k4cTbeHcDBBUx0gXXgSgA",
//     authDomain: "react-cursos-40612.firebaseapp.com",
//     projectId: "react-cursos-40612",
//     storageBucket: "react-cursos-40612.appspot.com",
//     messagingSenderId: "237368692081",
//     appId: "1:237368692081:web:22834f6c6d66fb88bbbad0"
// };


//testing
const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERING,
    appId: VITE_APPID,
    measurementId: VITE_MEASUREMENTID,
};

// console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);