import {makeAutoObservable} from 'mobx';
import {v4 as uuid4} from 'uuid';
import Todo from '../domain/Todo';

class TodoListStore {

    public items: Todo[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    fetchList() {
        this.items = [
            {id: uuid4(), title: 'item 1', completed: false},
            {id: uuid4(), title: 'item 2', completed: true},
            {id: uuid4(), title: 'item 3', completed: false}
        ];
    }

    addTodo(todo: Todo) {
        this.items.push(todo);
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

export default new TodoListStore();
