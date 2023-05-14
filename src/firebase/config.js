// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
    apiKey: "AIzaSyDGsGHWAAoilIonot5pHzbyKKH28dM6w4o",
    authDomain: "testing-react-98425.firebaseapp.com",
    projectId: "testing-react-98425",
    storageBucket: "testing-react-98425.appspot.com",
    messagingSenderId: "140182538649",
    appId: "1:140182538649:web:d5811eb44ec40c23f46b08",
    measurementId: "G-31GD5W08TT"
};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);