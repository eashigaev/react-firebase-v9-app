import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import Auth from './components/Auth';
import NotFoundPage from './pages/NotFoundPage';
import AuthStore from './stores/AuthStore';

function App() {

    return (
        <div className="App">
            <h1>Welcome to the app!</h1>
            <Auth authStore={AuthStore}/>
            <Routes>
                <Route path="/" element={<FirstPage/>}/>
                <Route path="/second" element={<SecondPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

function ComposedApp() {
    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
}

export default ComposedApp;
