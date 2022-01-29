import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';

function App() {
    return (
        <div className="App">
            <h1>Welcome to the app!</h1>
            <Routes>
                <Route path="/" element={<FirstPage />} />
                <Route path="/second" element={<SecondPage />} />
            </Routes>
        </div>
    );
}

function ComposedApp() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default ComposedApp;
