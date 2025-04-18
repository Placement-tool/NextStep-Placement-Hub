import { 
    handleStudentSignup,
    handleStudentLogin,
    logout
  } from '../../utils/auth';
  
  import {
    getSignupFormErrors,
    getLoginFormErrors
  } from '../../utils/validation';
  
  jest.mock('../../firebase-config', () => ({
    auth: {}
  }));
  
  jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    updateProfile: jest.fn(),
    signOut: jest.fn(),
    fetchSignInMethodsForEmail: jest.fn()
  }));
  
  import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile,
    signOut,
    fetchSignInMethodsForEmail
  } from "firebase/auth";
  
  describe('Authentication Flow Integration', () => {
    const mockNavigate = jest.fn();
    
    beforeEach(() => {
      jest.clearAllMocks();
      document.body.innerHTML = `
        <div>
          <input id="name-input" />
          <div id="name-input-container"></div>
          <input id="email-input" />
          <div id="email-input-container"></div>
          <input id="password-input" />
          <div id="password-input-container"></div>
          <input id="confirm-password-input" />
          <div id="confirm-password-input-container"></div>
          <div id="error-message"></div>
        </div>
      `;
    });
  
    test('Student signup and login flow - success path', async () => {
      const testEmail = 'student@example.com';
      const testPassword = 'Password123!';
      const testName = 'Test Student';
      
      createUserWithEmailAndPassword.mockResolvedValue({ user: {} });
      updateProfile.mockResolvedValue({});
      signInWithEmailAndPassword.mockResolvedValue({ user: { displayName: testName } });
      signOut.mockResolvedValue({});
  
      const signupErrors = getSignupFormErrors(testName, testEmail, testPassword, testPassword);
      expect(signupErrors).toEqual([]);
      
      const signupResult = await handleStudentSignup(
        testEmail, 
        testPassword, 
        testName, 
        testPassword, 
        mockNavigate
      );
      
      expect(signupResult).toBeNull();
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, testEmail, testPassword);
      expect(updateProfile).toHaveBeenCalledWith({}, { displayName: testName });
      expect(mockNavigate).toHaveBeenCalledWith('/main');
      
      mockNavigate.mockClear();
      await logout();
      expect(signOut).toHaveBeenCalledWith({});
      
      const loginErrors = getLoginFormErrors(testEmail, testPassword);
      expect(loginErrors).toEqual([]);
      
      const loginResult = await handleStudentLogin(testEmail, testPassword, mockNavigate);
      
      expect(loginResult).toBeNull();
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, testEmail, testPassword);
      expect(mockNavigate).toHaveBeenCalledWith('/main');
    });
  
    test('Student signup and login flow - failure path', async () => {
      const testEmail = 'badstudent@example.com';
      const testPassword = 'short';
      const testName = '';
      
      const signupErrors = getSignupFormErrors(testName, testEmail, testPassword, 'different');
      expect(signupErrors.length).toBeGreaterThan(0);
      
      createUserWithEmailAndPassword.mockRejectedValue({ message: 'Email already in use' });
      
      const goodName = 'Good Name';
      const goodPassword = 'GoodPassword123!';
      
      const signupResult = await handleStudentSignup(
        testEmail, 
        goodPassword, 
        goodName, 
        goodPassword, 
        mockNavigate
      );
      
      expect(signupResult).toBe('Email already in use');
      expect(mockNavigate).not.toHaveBeenCalled();
      
      signInWithEmailAndPassword.mockRejectedValue({ message: 'Invalid email or password' });
      
      const loginResult = await handleStudentLogin(testEmail, 'wrongpassword', mockNavigate);
      
      expect(loginResult).toBe('Invalid email or password');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  
    test('Full user lifecycle - create, login, logout', async () => {
      const testEmail = 'lifecycle@example.com';
      const testPassword = 'Lifecycle123!';
      const testName = 'Lifecycle User';
      
      createUserWithEmailAndPassword.mockResolvedValue({ user: {} });
      updateProfile.mockResolvedValue({});
      signInWithEmailAndPassword.mockResolvedValue({ user: { displayName: testName } });
      signOut.mockResolvedValue({});
      fetchSignInMethodsForEmail.mockResolvedValue([]);
      
      await handleStudentSignup(
        testEmail, 
        testPassword, 
        testName, 
        testPassword, 
        mockNavigate
      );
      
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, testEmail, testPassword);
      mockNavigate.mockClear();
      
      await logout();
      expect(signOut).toHaveBeenCalledWith({});
      
      await handleStudentLogin(testEmail, testPassword, mockNavigate);
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, testEmail, testPassword);
      expect(mockNavigate).toHaveBeenCalledWith('/main');
    });
  });