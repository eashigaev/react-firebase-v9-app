import React from "react";
import {signInWithPopup, signOut} from "firebase/auth";
import {auth, googleProvider} from '../providers/firebase';
import {observer} from 'mobx-react-lite';
import {runInAction} from 'mobx';
import AuthStore from '../stores/AuthStore';
import {Avatar, Box, Button, IconButton} from '@mui/material';

const Auth = ({store}: AuthProps) => {

    const signInWithGoogle = () => signInWithPopup(auth, googleProvider).then((res) => {
        const googleUser = res.user;
        const authUser = {
            id: googleUser.uid!,
            name: googleUser.displayName!,
            photoUrl: googleUser.photoURL!
        };
        runInAction(() => store.signIn(authUser));
        return res;
    });

    const signOutWithGoogle = () => signOut(auth).then((res) => {
        runInAction(() => store.signOut());
        return res;
    });

    return store.user
        ? (
            <Box sx={{flexGrow: 0}}>
                <Profile {...store.user}/>
                <SignOut click={signOutWithGoogle}/>
            </Box>
        )
        : (<SignIn click={signInWithGoogle}/>);
};
type AuthProps = {
    store: typeof AuthStore
}

const SignIn = ({click}: SignInProps) => {

    return (
        <Button color="inherit" onClick={click} className="google-auth">Sign in With Google</Button>
    );
};
type SignInProps = {
    click: any
}

const SignOut = ({click}: SignOutProps) => {

    return (
        <Button color="inherit" onClick={click}>Sign out</Button>
    );
};
type SignOutProps = {
    click: any
}

const Profile = ({name, photoUrl}: ProfileProps) => {

    return (
        <>
            <IconButton sx={{p: 0}}>
                <Avatar alt={name} src={photoUrl} />
            </IconButton>
        </>
    );
};
type ProfileProps = {
    name: string,
    photoUrl: string
}

export default observer(Auth);
