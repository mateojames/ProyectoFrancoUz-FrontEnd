import React, {useEffect} from "react"
import ResponsiveAppBar from "./ResponsiveAppBar"
import AuthSwitch from "./Switch"
import { setCurrentUser, setLoading } from "../store/actions/auth";
import { auth } from "../firebase"
import {
    onAuthStateChanged
} from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';

function AppContent() {

    const isLoading = useSelector(state => state.auth.isLoading);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setLoading());
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log('unsuscribe');
          console.log({ currentUser });
          dispatch(setCurrentUser(currentUser))
          //setLoading(false);
        });
        return () => unsubuscribe();
    }, []);

    const authContent = (
        <>
            <ResponsiveAppBar/>
            <AuthSwitch/>
        </>
    )

     return (isLoading ? null : authContent)
}

export default AppContent;
