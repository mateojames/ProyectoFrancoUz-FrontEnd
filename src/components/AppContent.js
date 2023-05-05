import React, {useEffect, useState} from "react"
import ResponsiveAppBar from "./ResponsiveAppBar"
import AuthSwitch from "./Switch"
import { setCurrentUser, setLoading } from "../store/actions/auth";
import { auth } from "../firebase"
import {getToken, onMessage} from "firebase/messaging";
import {messaging} from "../firebase";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    onAuthStateChanged
} from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { addNotificationToken } from "../store/actions/addNotificationToken";

function AppContent() {

    const isLoading = useSelector(state => state.auth.isLoading);
    const user = useSelector(state => state.auth.currentUser);
    const [role, setRole] = useState(null)
    const [notificationToken, setNotificationToken] = useState(null)
    const dispatch = useDispatch();

    async function obtainClaims() {
        const IdToken = user ? await user.getIdTokenResult() : null
        if(IdToken){
            console.log('CLAIMS', IdToken.claims)
            setRole(IdToken.claims.role)
        }
    }

    const activarMensajes = async ()=> {
        console.log('vapid ',process.env)
        const token = await getToken(messaging,{
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
        }).catch(error => console.log("Tuviste un error al generar el token, papá: ",error));
      
      
        if(token){
            setNotificationToken(token)
            console.log("tu token:",token);
        }
        if(!token) console.log("no tienes token, rey");
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

    useEffect(() => {
        if(notificationToken && user){
            const data = {
                user: user.uid,
                notificationToken
            }
            dispatch(addNotificationToken(data));
        }
    }, [notificationToken, user]);

    useEffect(()=>{
        onMessage(messaging, message=>{
          console.log("tu mensaje:", message);
          toast(message.data.title);
     })}, []);

    useEffect (() => {
        obtainClaims()
    }, [user])

    useEffect (() => {
        console.log('rol ',role)
        if(role){
            activarMensajes()
        }
    }, [role])

    const authContent = (
        <>
            <ResponsiveAppBar role={role}/>
            <ToastContainer />
            <AuthSwitch role={role}/>
        </>
    )

    var content = null

    if(!isLoading){
        content = authContent
    }

     return (content)
}

export default AppContent;
