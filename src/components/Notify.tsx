import {getToken, onMessage} from "firebase/messaging";
import {useEffect, useState} from "react";
import {messaging} from '../providers/firebase';

// TODO: Fix error
// FirebaseError: Messaging: A problem occurred while unsubscribing the user from FCM:
// Requested entity was not found. (messaging/token-unsubscribe-failed). (messaging/token-unsubscribe-failed).

const vapidKey = "BCSW6XguEeO0QzGo8myF-B3meQgErWJQFAsUT6HPheMwj1uZ1QAeLEB90g7txUAeTCUEEl7Hmf3YSSd9pxJXXok";

const Notify = () => {

    const [permissionStatus, setPermissionStatus] = useState(Notification.permission);

    const onGetTokenSuccess = (currentToken: string) => {
        if (currentToken) { // Send the token to your server and update the UI if necessary
            console.log('The registration token is available.', currentToken);
        } else { // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
        }
    };
    const onGetTokenError = (err: string) => {
        console.log('An error occurred while retrieving token. ', err);
    };

    useEffect(() => {
        Notification
            .requestPermission()
            .then((permission: NotificationPermission) => setPermissionStatus(permission));
    }, []);

    useEffect(() => {
        if (permissionStatus !== 'granted') return;

        getToken(messaging, {vapidKey})
            .then(onGetTokenSuccess)
            .catch(onGetTokenError);

        return onMessage(messaging, (payload) => {
            console.log('Received message', payload);
        });
    }, [permissionStatus]);

    return (
        <>
            <sub>
                Notifications permission: <span className="status">{permissionStatus}</span>
            </sub>
        </>
    );
}
export default Notify;
