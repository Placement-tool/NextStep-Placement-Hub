import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../firebase-config'; 
import '../public/style.css'; 

const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/main');
        } catch (error) {
            console.error('Login Error:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="wrapper">
            <h1>Log in</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form id="form" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email-input">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF3B0">
                            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
                        </svg>
                    </label>
                    <input required type="email" name="email" id="email-input" placeholder="Email" />
                </div>

                <div>
                    <label htmlFor="password-input">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF3B0">
                            <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
                        </svg>
                    </label>
                    <input required type="password" name="password" id="password-input" placeholder="Password" />
                </div>
                <button type="submit">Log in</button>
            </form>
            <p>New here? <Link to="/signup">Create An Account</Link></p>
            <p><button type="button" onClick={() => alert("Password reset functionality")}>Forgot Password?</button></p>
        </div>
    );
};

export default Login;