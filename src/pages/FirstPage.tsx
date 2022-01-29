import TodoList from '../components/TodoList';
import TodoListStore from '../stores/TodoListStore';
import {Link} from 'react-router-dom';
import React from 'react';

function FirstPage() {
    return (
        <>
            <main>
                <h2>In Memory Todo List</h2>
                <TodoList store={new TodoListStore()}/>
            </main>
            <nav>
                <Link to="/second">Second Page</Link>
            </nav>
        </>
    );
}

export default FirstPage;
