import React from "react";
import {signInWithPopup, signOut} from "firebase/auth";
import {auth, googleProvider} from '../providers/firebase';
import {observer} from 'mobx-react-lite';
import {runInAction} from 'mobx';
import AuthStore from '../stores/AuthStore';

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
            <>
                <Profile {...store.user}/>
                <SignOut click={signOutWithGoogle}/>
            </>
        )
        : (<SignIn click={signInWithGoogle}/>);
};
type AuthProps = {
    store: typeof AuthStore
}

const SignIn = ({click}: SignInProps) => {

    return (
        <button onClick={click} className="google-auth">Sign in With Google</button>
    );
};
type SignInProps = {
    click: any
}

const SignOut = ({click}: SignOutProps) => {

    return (
        <button onClick={click}>Sign out</button>
    );
};
type SignOutProps = {
    click: any
}

const Profile = ({name, photoUrl}: ProfileProps) => {

    return (
        <>
            <img src={photoUrl} alt={name}/>
            <h3>{name}</h3>
        </>
    );
};
type ProfileProps = {
    name: string,
    photoUrl: string
}

export default observer(Auth);
