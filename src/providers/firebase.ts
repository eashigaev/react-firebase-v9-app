import {initializeApp} from 'firebase/app';
import {collection, getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB41q3d6nBKp7YuvJ_CuAK2ji7oNAJ-7K4",
    authDomain: "superchat-b1133.firebaseapp.com",
    projectId: "superchat-b1133",
    storageBucket: "superchat-b1133.appspot.com",
    messagingSenderId: "695513250470",
    appId: "1:695513250470:web:7f649182a9a961ca731267"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const todosCol = collection(db, 'todo');

export {todosCol};
