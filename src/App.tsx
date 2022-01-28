import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import FirebaseTodoListStore from './stores/FirebaseTodoListStore';
import TodoListStore from './stores/TodoListStore';

function App() {
    return (
        <div className="App">
            <TodoList store={new TodoListStore()}/>
            <TodoList store={new FirebaseTodoListStore()}/>
        </div>
    );
}

export default App;
