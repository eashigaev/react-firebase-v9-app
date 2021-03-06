import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import InMemoryPage from './pages/InMemoryPage';
import FirebasePage from './pages/FirebasePage';
import Auth from './components/Auth';
import NotFoundPage from './pages/NotFoundPage';
import AuthStore from './stores/AuthStore';
import Notify from './components/Notify';
import {AppBar, Container, createTheme, responsiveFontSizes, ThemeProvider, Toolbar, Typography} from '@mui/material';

function App() {

    return (
        <div className="App">
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        React Firebase v9
                    </Typography>
                    <Auth store={AuthStore}/>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Typography variant="body2" sx={{mt: 4}}>
                    <Routes>
                        <Route path="/" element={<InMemoryPage/>}/>
                        <Route path="/firebase" element={<FirebasePage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                    <Notify/>
                </Typography>
            </Container>
        </div>
    );
}

function ComposedApp() {

    let theme = createTheme({
        typography: {
            fontSize: 14
        }
    });
    theme = responsiveFontSizes(theme);

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default ComposedApp;
