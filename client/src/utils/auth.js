import { auth } from '../firebase-config';
import { getSignupFormErrors, getLoginFormErrors } from './validation.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail,
  signOut 
} from "firebase/auth";


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

