import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import MainPage from './MainPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Login page as the default route */}
                <Route path="/signup" element={<Signup />} /> {/* Signup page */}
                <Route path="/main" element={<MainPage />} /> {/* Main page */}
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect all unknown routes to login */}
            </Routes>
        </Router>
    );
};

export default App;