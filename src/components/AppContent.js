import React, {useEffect, useState} from "react"
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
    const user = useSelector(state => state.auth.currentUser);
    const [role, setRole] = useState(null)
    const dispatch = useDispatch();

    async function obtainClaims() {
        const IdToken = user ? await user.getIdTokenResult() : null
        if(IdToken){
            setRole(IdToken.claims.role)
        }
    }
    
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

    useEffect (() => {
        obtainClaims()
    }, [user])

    useEffect (() => {
        console.log('rol ',role)
    }, [role])

    const authContent = (
        <>
            <ResponsiveAppBar role={role}/>
            <AuthSwitch role={role}/>
        </>
    )

    var content = null

    if(!isLoading && ((user != null  && role != null) || user === null)){
        content = authContent
    }

     return (content)
}

export default AppContent;
