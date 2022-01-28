import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import Todo from '../domain/Todo';

const TodoList = (props: any) => {
    const {store} = props;
    const [addTodoState, setAddTodoState] = useState({
        'title': ''
    })

    const handleAddForm = (e: any) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setAddTodoState({
            ...addTodoState,
            [name]: value
        })
    }

    const addTodo = (e: any) => {
        e.preventDefault();
        store.addTodo(addTodoState);
        e.target.reset();
    }

    console.log('render:TodoList');

    useEffect(() => {
        return store.fetchList();
    }, []);

    return (
        <>
            <div className="row">
                <form onSubmit={addTodo}>
                    <input name="title" type="text" onChange={handleAddForm}/>
                    <button type="submit">Add New Todo</button>
                </form>

                <table className="table table-hover">
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
                                <button className="btn btn-sm btn-info" onClick={() => store.toggleTodo(todo.id!)}>
                                    Toggle
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => store.removeTodo(todo.id!)}>
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

export default observer(TodoList);
