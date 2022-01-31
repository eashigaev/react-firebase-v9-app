// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', (event) => {
    console.log('notificationclick: ', event.notification);
    // event.stopImmediatePropagation();
    event.notification.close();
    // eslint-disable-next-line no-undef
    event.waitUntil(clients.openWindow('/second'))
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("notificationclose", (event) => {
    console.log('notificationclose');
    event.notification.close();
});

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

// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message', payload);
});

