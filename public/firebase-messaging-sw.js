// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyB41q3d6nBKp7YuvJ_CuAK2ji7oNAJ-7K4",
    authDomain: "superchat-b1133.firebaseapp.com",
    projectId: "superchat-b1133",
    storageBucket: "superchat-b1133.appspot.com",
    messagingSenderId: "695513250470",
    appId: "1:695513250470:web:7f649182a9a961ca731267"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle, notificationOptions);
});
