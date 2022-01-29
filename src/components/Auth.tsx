import React from "react";
import {signInWithPopup, signOut} from "firebase/auth";
import {auth, googleProvider} from '../providers/firebase';
import {observer} from 'mobx-react-lite';
import {runInAction} from 'mobx';

const Auth = (props: any) => {

    const {authStore} = props;

    const signInWithGoogle = () => signInWithPopup(auth, googleProvider).then((res) => {
        const googleUser = res.user;
        const authUser = {
            id: googleUser.uid,
            name: googleUser.displayName,
            photoUrl: googleUser.photoURL
        };
        runInAction(() => authStore.signIn(authUser));
        return res;
    });

    const signOutWithGoogle = () => signOut(auth).then((res) => {
        runInAction(() => authStore.signOut());
        return res;
    });

    return authStore.user
        ? (
            <>
                <Profile user={authStore.user}/>
                <SignOut click={signOutWithGoogle}/>
            </>
        )
        : (<SignIn click={signInWithGoogle}/>);
};

const SignIn = (props: any) => {

    return (
        <button onClick={props.click}>Sign in With Google</button>
    );
};

const SignOut = (props: any) => {

    return (
        <button onClick={props.click}>Sign out</button>
    );
};

const Profile = (props: any) => {

    const {user: {name, photoUrl}} = props;

    return (
        <>
            <img src={photoUrl} alt={name}/>
            <h3>{name}</h3>
        </>
    );
};

export default observer(Auth);
