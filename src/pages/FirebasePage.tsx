import TodoList from '../components/TodoList';
import {Link as RouterLink} from 'react-router-dom';
import React from 'react';
import FirebaseTodoListStore from '../stores/FirebaseTodoListStore';
import {Link, Typography} from '@mui/material';

function FirebasePage() {
    return (
        <>
            <main>
                <Typography variant="h4">Firebase Todo List</Typography>
                <TodoList store={FirebaseTodoListStore}/>
            </main>
            <nav>
                <Link component={RouterLink}  to="/">In Memory Todo List</Link>
            </nav>
        </>
    );
}

export default FirebasePage;
