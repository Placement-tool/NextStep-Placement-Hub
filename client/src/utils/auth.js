import { auth } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';
import { getSignupFormErrors, getLoginFormErrors } from './validation.js';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail,
  signOut 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Remove the DOMContentLoaded event listener and hard redirects
export const setupAuthListeners = (navigate) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in:", user.email);
      navigate('/main'); // Use navigate for SPA navigation
    } else {
      console.log("No user is signed in");
      navigate('/'); // Redirect to login if not authenticated
    }
  });
};

export const handleSignup = async (email, password, name, confirmPassword, navigate) => {
  const errors = getSignupFormErrors(name, email, password, confirmPassword);
  
  if (errors.length > 0) {
    return errors.join(". ");
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    navigate('/main'); // Use navigate for SPA navigation
    return null; // No errors
  } catch (error) {
    console.error("Signup error:", error);
    return error.message;
  }
};

export const handleLogin = async (email, password, navigate) => {
  const errors = getLoginFormErrors(email, password);
  
  if (errors.length > 0) {
    return errors.join(". ");
  }
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/main'); // Use navigate for SPA navigation
    return null; // No errors
  } catch (error) {
    console.error("Login error:", error);
    return error.message;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Logout Error:', error);
  }
};

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
