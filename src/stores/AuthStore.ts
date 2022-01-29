import {makeAutoObservable} from 'mobx';
import AuthUser from '../domain/AuthUser';

class AuthStore {

    public user?: AuthUser;

    constructor() {
        makeAutoObservable(this)
    }

    signIn(user: AuthUser) {
        this.user = user;
    }

    signOut() {
        this.user = undefined;
    }
}

export default new AuthStore();
