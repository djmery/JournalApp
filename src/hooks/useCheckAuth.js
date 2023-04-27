import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { logout, login } from "../store/auth";
import { startLoadingNotes } from "../store/journal/thunks";


export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        //cuando el estado de la autenticación cambia.
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            const { uid, email, photoURL, displayName } = user;
            dispatch(login({ uid, email, photoURL, displayName }));
            dispatch(startLoadingNotes());
        });

    }, []);

    return status;
}

