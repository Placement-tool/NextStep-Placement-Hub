import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebase-config';
import '../styles/auth.css';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const db = getFirestore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (e.target.parentElement.classList.contains('incorrect')) {
      e.target.parentElement.classList.remove('incorrect');
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    const { name, email, institution, password, confirmPassword } = formData;
    let errors = [];

    if (name === '' || name === null) {
      errors.push('Name is required');
      document.getElementById('name-input').parentElement.classList.add('incorrect');
    }

    if (email === '' || email === null) {
      errors.push('Email is required');
      document.getElementById('email-input').parentElement.classList.add('incorrect');
    }

    if (institution === '' || institution === null) {
      errors.push('Institution is required');
      document.getElementById('institution-input').parentElement.classList.add('incorrect');
    }

    if (password === '' || password === null) {
      errors.push('Password is required');
      document.getElementById('password-input').parentElement.classList.add('incorrect');
    }

    if (password.length < 8) {
      errors.push('Password must have at least 8 characters');
      document.getElementById('password-input').parentElement.classList.add('incorrect');
    }

    if (password !== confirmPassword) {
      errors.push('Password does not match confirm password');
      document.getElementById('password-input').parentElement.classList.add('incorrect');
      document.getElementById('confirm-password-input').parentElement.classList.add('incorrect');
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
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      // Save additional user data in Firestore
      await setDoc(doc(db, "students", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        institution: formData.institution,
        createdAt: new Date()
      });
      
      navigate('/main'); 
    } catch (error) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email already in use');
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="wrapper">
      <h1>Student Signup</h1>
      <p id="error-message">{errorMessage}</p>
      <form id="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name-input">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF3B0">
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
          </label>
          <input
            required
            type="text"
            name="name"
            id="name-input"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

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
          <label htmlFor="institution-input">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF3B0">
              <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
            </svg>
          </label>
          <input
            required
            type="text"
            name="institution"
            id="institution-input"
            placeholder="Institution"
            value={formData.institution}
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

        <div>
          <label htmlFor="confirm-password-input">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFF3B0">
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
            </svg>
          </label>
          <input
            required
            type="password"
            name="confirmPassword"
            id="confirm-password-input"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          Sign up
        </button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
      <br />
      <p>Looking for the Company Signup? <Link to="/company-register">Register Here</Link></p>
    </div>
  );
};

export default StudentSignup;