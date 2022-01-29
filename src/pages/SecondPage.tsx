import TodoList from '../components/TodoList';
import {Link} from 'react-router-dom';
import React from 'react';
import FirebaseTodoListStore from '../stores/FirebaseTodoListStore';

function SecondPage() {
    return (
        <>
            <main>
                <h2>Firebase Todo List</h2>
                <TodoList store={new FirebaseTodoListStore()}/>
            </main>
            <nav>
                <Link to="/">First Page</Link>
            </nav>
        </>
    );
}

export default SecondPage;
