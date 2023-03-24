

importScripts("https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js")
importScripts('swenv.js'); // this file should have all the vars declared
console.log('VARIABLE',process.env.FB_API_KEY)

//ADD HERE THE FIREBASE CONFIG
const firebaseConfig = {};

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