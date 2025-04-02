import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import '../styles/auth.css';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Remove incorrect class when user starts typing
    if (e.target.parentElement.classList.contains('incorrect')) {
      e.target.parentElement.classList.remove('incorrect');
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    const { email, password } = formData;
    let errors = [];

    if (email === '' || email === null) {
      errors.push('Email is required');
      document.getElementById('email-input').parentElement.classList.add('incorrect');
    }

    if (password === '' || password === null) {
      errors.push('Password is required');
      document.getElementById('password-input').parentElement.classList.add('incorrect');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      setErrorMessage(errors.join('. '));
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/main'); // Redirect to main page after successful login
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/invalid-credential') {
        setErrorMessage('Invalid email or password');
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="wrapper">
      <h1>Student Login</h1>
      <p id="error-message">{errorMessage}</p>
      <form id="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-input">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF3B0">
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
            </svg>
          </label>
          <input
            required
            type="email"
            name="email"
            id="email-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password-input">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF3B0">
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
            </svg>
          </label>
          <input
            required
            type="password"
            name="password"
            id="password-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          Log in
        </button>
      </form>
      <p>New here? <Link to="/student-signup">Create an Account</Link></p>
      <br />
      <p>Looking for the Company Login? <Link to="/company-login">Login Here</Link></p>
    </div>
  );
};

export default StudentLogin;