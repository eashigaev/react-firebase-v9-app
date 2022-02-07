import {getToken, onMessage} from "firebase/messaging";
import {useEffect, useState} from "react";
import {messaging, vapidKey} from '../providers/firebase';
import {Typography} from '@mui/material';

// TODO: Fix error
// FirebaseError: Messaging: A problem occurred while unsubscribing the user from FCM:
// Requested entity was not found. (messaging/token-unsubscribe-failed). (messaging/token-unsubscribe-failed).

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
        <Typography variant="caption" display="block" gutterBottom>
            Notifications permission: <span className="status">{permissionStatus}</span>
        </Typography>
    );
}
export default Notify;
