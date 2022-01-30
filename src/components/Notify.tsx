import {onMessage} from "firebase/messaging";
import React from "react";
import {messaging} from '../providers/firebase';

const Notify = () => {

    onMessage(messaging, (payload) => {
        console.log('Received message', payload);
    });

    return (
        <>
            <sub>Notification testing...</sub>
        </>
    );
}
export default Notify;
