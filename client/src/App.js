import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login.js';
import MainPage from './MainPage'; // Import the MainPage component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Login page as the default route */}
                <Route path="/main" element={<MainPage />} /> {/* Main page */}
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect all unknown routes to login */}
            </Routes>
        </Router>
    );
};

export default App;