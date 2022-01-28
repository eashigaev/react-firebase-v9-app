import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoListStore from './store/TodoListStore';

function App() {
    return (
        <div className="App">
            <TodoList store={TodoListStore}/>
        </div>
    );
}

export default App;
