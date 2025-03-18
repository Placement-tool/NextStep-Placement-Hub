import { auth } from '../firebase-config';
import { getSignupFormErrors, getLoginFormErrors } from './validation.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendPasswordResetEmail,
  signOut,
  fetchSignInMethodsForEmail
} from "firebase/auth";

export const checkEmailExists = async (email) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
};

export const handleSignup = async (email, password, name, confirmPassword, navigate) => {
  const errors = getSignupFormErrors(name, email, password, confirmPassword);
  
  if (errors.length > 0) {
    return errors.join(". ");
  }
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    navigate('/main'); 
    return null; 
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
    navigate('/main'); 
    return null; 
  } catch (error) {
    console.error("Login error:", error);
    return error.message;
  }
};

export const handlePasswordReset = async (email) => {
  try {
    // Check if the email exists before sending reset email
    const emailExists = await checkEmailExists(email);
    
    if (!emailExists) {
      return { success: false, message: 'No account exists with this email address.' };
    }
    
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password reset email sent! Please check your inbox.' };
  } catch (error) {
    console.error("Password reset error:", error);
    return { success: false, message: error.message };
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