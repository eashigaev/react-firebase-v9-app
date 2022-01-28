import {makeAutoObservable, runInAction} from 'mobx';
import {v4 as uuid4} from 'uuid';
import Todo from '../domain/Todo';
import {todosCol} from '../providers/firebase';
import {addDoc, onSnapshot, query} from "firebase/firestore"


class FirebaseTodoListStore {

    public items: Todo[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    async fetchList() {
        const q = query(todosCol);
        return onSnapshot(q, (snap) => {
            const items = snap.docs.map((doc) => doc.data() as Todo);
            runInAction(() => this.items = items)
        });
    }

    async addTodo(todo: Todo) {
        await addDoc(todosCol, {...todo, id: uuid4(), completed: false});
    }

    toggleTodo(id: string) {
        this.items = this.items.map((todo: Todo) =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        )
    }

    removeTodo(id: string) {
        this.items = this.items.filter((item: Todo) => item.id !== id)
    }
}

export default FirebaseTodoListStore;
