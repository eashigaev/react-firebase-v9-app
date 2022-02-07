import {initializeApp} from 'firebase/app';
import {collection, doc, getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getMessaging} from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyClHdVjCzvt3TfG8tkBu1v6MbVOUQPKL7Q",
    authDomain: "react-firebase-v9-app-e157a.firebaseapp.com",
    projectId: "react-firebase-v9-app-e157a",
    storageBucket: "react-firebase-v9-app-e157a.appspot.com",
    messagingSenderId: "180221274510",
    appId: "1:180221274510:web:2341db35896d4cb4341cdf"
};
const vapidKey = "BEoF5d-PPa5Rk_HufeeIQYQDUl-U6oxPpMLxFbDFXTVa8c-u0L1c7nAf6qEWEaEkB3kdTKno2RMnmkFiQajXFOk";

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const messaging = getMessaging(app);

const db = getFirestore(app);
const todosCol = collection(db, 'todos');
const todosDoc = (id: string) => doc(db, todosCol.path, id);

export {auth, googleProvider, messaging, db, vapidKey, todosCol, todosDoc};
