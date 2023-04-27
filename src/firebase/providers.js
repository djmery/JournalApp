import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            //User info
            displayName, email, photoURL, uid
        }


    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { photoURL, uid } = resp.user;
        //todo: actualizar el displayName en firebase
        //para saber el usuario actual FirebaseAuth.currentUser, lo loguea si se crea
        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, displayName, email
        }

    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }
}

export const loginWithEmailPassword = async ({ email, password }) => {
    //signInWithEmailAndPassword
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { photoURL, uid, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName, email
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }

    }
}

export const logoutFirebase = async () => {
    //cierra google, firebase, twittert,facebook......
    return await FirebaseAuth.signOut();
}