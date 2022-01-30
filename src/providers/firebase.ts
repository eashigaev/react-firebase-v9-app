import {initializeApp} from 'firebase/app';
import {collection, doc, getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getMessaging, getToken} from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyB41q3d6nBKp7YuvJ_CuAK2ji7oNAJ-7K4",
    authDomain: "superchat-b1133.firebaseapp.com",
    projectId: "superchat-b1133",
    storageBucket: "superchat-b1133.appspot.com",
    messagingSenderId: "695513250470",
    appId: "1:695513250470:web:7f649182a9a961ca731267"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const vapidKey = 'BCSW6XguEeO0QzGo8myF-B3meQgErWJQFAsUT6HPheMwj1uZ1QAeLEB90g7txUAeTCUEEl7Hmf3YSSd9pxJXXok';
const messaging = getMessaging(app);
getToken(messaging, {vapidKey})
    .then((currentToken: string) => {
        if (currentToken) { // Send the token to your server and update the UI if necessary
            console.log('The registration token is available.', currentToken);
        } else { // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
        }
    })
    .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });

const db = getFirestore(app);
const todosCol = collection(db, 'todo');
const todosDoc = (id: string) => doc(db, todosCol.path, id);

export {auth, googleProvider, messaging, db, todosCol, todosDoc};
