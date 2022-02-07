import {makeAutoObservable, runInAction} from 'mobx';
import {v4 as uuid4} from 'uuid';
import Todo from '../domain/Todo';
import {todosCol, todosDoc} from '../providers/firebase';
import {deleteDoc, onSnapshot, query, setDoc, updateDoc} from "firebase/firestore"

class FirebaseTodoListStore {

    public items: Todo[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    fetchList() {
        const q = query(todosCol);
        return onSnapshot(q, (snap) => {
            const items = snap.docs.map((doc) => doc.data() as Todo);
            runInAction(() => this.items = items)
        });
    }

    addTodo(todo: Todo) {
        const id = uuid4();
        setDoc(todosDoc(id), {...todo, id, completed: false});
        console.log('hahaha');
    }

    toggleTodo(id: string) {
        const item = this.items.find((todo: Todo) => todo.id === id);
        updateDoc(todosDoc(id), {completed: !item!.completed});
    }

    removeTodo(id: string) {
        deleteDoc(todosDoc(id));
    }
}

export default new FirebaseTodoListStore();
