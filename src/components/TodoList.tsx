import React, {ChangeEvent, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import Todo from '../domain/Todo';
import TodoListStore from '../stores/TodoListStore';
import FirebaseTodoListStore from '../stores/FirebaseTodoListStore';
import {Box, Button, FormControl, Input, Stack, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';

const TodoList = ({store}: TodoListProps) => {
    const initialTodoState = {
        completed: false,
        title: ''
    };
    const [addTodoForm, setAddTodoForm] = useState<Todo>(initialTodoState)

    const handleAddTodoForm = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setAddTodoForm({...addTodoForm, [name]: value})
    }

    const addTodo = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        store.addTodo(addTodoForm);
        setAddTodoForm(initialTodoState);
    }

    useEffect(() => {
        return store.fetchList();
    }, [store]);

    return (
        <>
            <Box component="form" onSubmit={addTodo} className="todo-form">
                <Stack sx={{pt: 4}} direction="row" spacing={2} justifyContent="center">
                    <Input id="title" name="title" value={addTodoForm.title} onChange={handleAddTodoForm}/>
                    <Button type="submit">Add New Todo</Button>
                </Stack>
            </Box>

            <Table id="todo-list" size="small" sx={{mt: 4, mb: 4}}>
                <TableHead className="thead-light">
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Completed?</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {store.items.map((todo: Todo) => (
                        <TableRow key={todo.id}>
                            <TableCell>{todo.title}</TableCell>
                            <TableCell>{todo.completed ? "✅" : ""}</TableCell>
                            <TableCell>
                                <Button className="todo-toggle" onClick={() => store.toggleTodo(todo.id!)}>
                                    Toggle
                                </Button>
                                <Button className="todo-remove" onClick={() => store.removeTodo(todo.id!)}>
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
type TodoListProps = {
    store: typeof TodoListStore | typeof FirebaseTodoListStore
}

export default observer(TodoList);
