import { auth } from './firebase-config.js';
import { getSignupFormErrors, getLoginFormErrors } from './validation.js';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  console.log("Auth.js loaded and running");
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in:", user.email);
      window.location.href = 'dashboard.html';
    } else {
      console.log("No user is signed in");
    }
  });

  const form = document.getElementById('form');
  const error_message = document.getElementById('error-message');

  if (!form) {
    console.error("Form element not found!");
    return;
  }

  if (!error_message) {
    console.error("Error message element not found!");
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Form submitted");
    
    const email = document.getElementById('email-input')?.value;
    const password = document.getElementById('password-input')?.value;
    const isSignup = document.getElementById('name-input') !== null;
    
    if (!email || !password) {
      console.error("Email or password input not found!");
      if (error_message) error_message.innerText = "Form inputs not found. Please refresh the page.";
      return;
    }
    
    console.log("Processing " + (isSignup ? "signup" : "login") + " for email:", email);
    
    if (isSignup) {
      handleSignup(email, password, error_message);
    } else {
      handleLogin(email, password, error_message);
    }
  });

  const forgotPasswordBtn = document.getElementById('forgot-password');
  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = prompt('Please enter your email address to reset your password:');
      
      if (email) {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            alert('Password reset email sent! Check your inbox.');
          })
          .catch((error) => {
            console.error("Password reset error:", error);
            alert('Error: ' + error.message);
          });
      }
    });
  }
});

function handleSignup(email, password, error_message) {
  const name = document.getElementById('name-input')?.value;
  const confirmPassword = document.getElementById('confirm-password-input')?.value;
  
  if (!name || !confirmPassword) {
    console.error("Name or confirm password input not found!");
    if (error_message) error_message.innerText = "Form inputs not found. Please refresh the page.";
    return;
  }
  
  const errors = getSignupFormErrors(name, email, password, confirmPassword);
  
  if (errors.length > 0) {
    console.log("Signup validation errors:", errors);
    if (error_message) error_message.innerText = errors.join(". ");
    return;
  }
  
  console.log("Creating new user account...");
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User created successfully:", userCredential.user.uid);
      return updateProfile(userCredential.user, {
        displayName: name
      });
    })
    .then(() => {
      console.log("Profile updated successfully, redirecting to dashboard");
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      console.error("Signup error:", error);
      const errorCode = error.code;
      let errorMessage = error.message;
      
      if (errorCode === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use a different email or try logging in.';
      } else if (errorCode === 'auth/weak-password') {
        errorMessage = 'Please choose a stronger password.';
      }
      
      if (error_message) error_message.innerText = errorMessage;
    });
}

function handleLogin(email, password, error_message) {
  const errors = getLoginFormErrors(email, password);
  
  if (errors.length > 0) {
    console.log("Login validation errors:", errors);
    if (error_message) error_message.innerText = errors.join(". ");
    return;
  }
  
  console.log("Attempting to sign in...");
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login successful:", userCredential.user.email);
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      console.error("Login error:", error);
      const errorCode = error.code;
      let errorMessage = 'Invalid email or password.';
      
      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      } else if (errorCode === 'auth/too-many-requests') {
        errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
      }
      
      if (error_message) error_message.innerText = errorMessage;
    });
}