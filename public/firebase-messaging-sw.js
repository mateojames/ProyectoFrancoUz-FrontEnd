

importScripts("https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js")

//ADD HERE THE FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyA9rAS_If_57QEBw7JIPr65mtUcaqd03LM",
    authDomain: "asocicacion-franco-uiz.firebaseapp.com",
    databaseURL: "https://asocicacion-franco-uiz-default-rtdb.firebaseio.com/",
    projectId: "asocicacion-franco-uiz",
    storageBucket: "asocicacion-franco-uiz.appspot.com",
    messagingSenderId: "415972558141",
    appId: "1:415972558141:web:bbada07ceb1cd3642f3154",
    measurementId: "G-L4HRS19C5Q"
  }

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);


messaging.onBackgroundMessage(payload => {
    console.log("Recibiste mensaje mientras estabas ausente");
// previo a mostrar notificación
    const notificationTitle= payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo192.png"
    }


    return self.registration.showNotification(
        notificationTitle, 
        notificationOptions
    )
})