import TodoList from '../components/TodoList';
import TodoListStore from '../stores/TodoListStore';
import {Link as RouterLink} from 'react-router-dom';
import React from 'react';
import {Typography, Link} from '@mui/material';

function FirstPage() {
    return (
        <>
            <main>
                <Typography variant="h4">In Memory Todo List</Typography>
                <TodoList store={TodoListStore}/>
            </main>
            <nav>
                <Link component={RouterLink} to="/second">Second Page</Link>
            </nav>
        </>
    );
}

export default FirstPage;
