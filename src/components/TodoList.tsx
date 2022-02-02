import React, {ChangeEvent, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import Todo from '../domain/Todo';
import TodoListStore from '../stores/TodoListStore';
import FirebaseTodoListStore from '../stores/FirebaseTodoListStore';

const TodoList = ({store}: TodoListProps) => {
    const [addTodoState, setAddTodoState] = useState<Todo>({
        completed: false,
        title: ''
    })

    const handleAddForm = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setAddTodoState({...addTodoState, [name]: value})
    }

    const addTodo = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        store.addTodo(addTodoState);
        e.target.reset();
    }

    useEffect(() => {
        return store.fetchList();
    }, [store]);

    return (
        <>
            <div className="row">
                <form onSubmit={addTodo} className="todo-form">
                    <input name="title" type="text" onChange={handleAddForm}/>
                    <button type="submit">Add New Todo</button>
                </form>

                <table id="todo-list">
                    <thead className="thead-light">
                    <tr>
                        <th>Title</th>
                        <th>Completed?</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {store.items.map((todo: Todo) => (
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.completed ? "✅" : ""}</td>
                            <td>
                                <button className="todo-toggle" onClick={() => store.toggleTodo(todo.id!)}>
                                    Toggle
                                </button>
                                <button className="todo-remove" onClick={() => store.removeTodo(todo.id!)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
type TodoListProps = {
    store: typeof TodoListStore | typeof FirebaseTodoListStore
}

export default observer(TodoList);
