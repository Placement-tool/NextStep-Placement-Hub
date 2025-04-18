import { 
    checkEmailExists, 
    handleSignup, 
    handleLogin, 
    handleStudentSignup, 
    handleStudentLogin,
    handlePasswordReset,
    logout
  } from '../../utils/auth';
  
  import { getSignupFormErrors, getLoginFormErrors } from '../../utils/validation';
  
  jest.mock('../../firebase-config', () => ({
    auth: {}
  }));
  
  jest.mock('../../utils/validation.js', () => ({
    getSignupFormErrors: jest.fn(),
    getLoginFormErrors: jest.fn()
  }));
  
  jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    updateProfile: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
    signOut: jest.fn(),
    fetchSignInMethodsForEmail: jest.fn()
  }));
  
  import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile,
    sendPasswordResetEmail,
    signOut,
    fetchSignInMethodsForEmail
  } from "firebase/auth";
  
  describe('Auth Utils', () => {
    const mockNavigate = jest.fn();
    
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('checkEmailExists', () => {
      it('should return true when email exists', async () => {
        fetchSignInMethodsForEmail.mockResolvedValue(['password']);
        const result = await checkEmailExists('test@example.com');
        expect(result).toBe(true);
        expect(fetchSignInMethodsForEmail).toHaveBeenCalledWith({}, 'test@example.com');
      });
  
      it('should return false when email does not exist', async () => {
        fetchSignInMethodsForEmail.mockResolvedValue([]);
        const result = await checkEmailExists('new@example.com');
        expect(result).toBe(false);
      });
  
      it('should throw error when Firebase call fails', async () => {
        const mockError = new Error('Firebase error');
        fetchSignInMethodsForEmail.mockRejectedValue(mockError);
        
        await expect(checkEmailExists('test@example.com')).rejects.toThrow('Firebase error');
      });
    });
  
    describe('handleSignup', () => {
      it('should return validation errors when form is invalid', async () => {
        getSignupFormErrors.mockReturnValue(['Name is required', 'Invalid email']);
        
        const result = await handleSignup('test@example.com', 'password', '', 'password', mockNavigate);
        
        expect(result).toBe('Name is required. Invalid email');
        expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
      });
  
      it('should create user and navigate when signup is successful', async () => {
        getSignupFormErrors.mockReturnValue([]);
        const mockUserCredential = { user: {} };
        createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
        
        const result = await handleSignup('test@example.com', 'Password123!', 'Test User', 'Password123!', mockNavigate);
        
        expect(result).toBeNull();
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@example.com', 'Password123!');
        expect(updateProfile).toHaveBeenCalledWith({}, { displayName: 'Test User' });
        expect(mockNavigate).toHaveBeenCalledWith('/main');
      });
  
      it('should return error message when signup fails', async () => {
        getSignupFormErrors.mockReturnValue([]);
        const mockError = { message: 'Email already in use' };
        createUserWithEmailAndPassword.mockRejectedValue(mockError);
        
        const result = await handleSignup('test@example.com', 'Password123!', 'Test User', 'Password123!', mockNavigate);
        
        expect(result).toBe('Email already in use');
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  
    describe('handleLogin', () => {
      it('should return validation errors when form is invalid', async () => {
        getLoginFormErrors.mockReturnValue(['Email is required']);
        
        const result = await handleLogin('', 'password', mockNavigate);
        
        expect(result).toBe('Email is required');
        expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
      });
  
      it('should sign in user and navigate when login is successful', async () => {
        getLoginFormErrors.mockReturnValue([]);
        signInWithEmailAndPassword.mockResolvedValue({});
        
        const result = await handleLogin('test@example.com', 'Password123!', mockNavigate);
        
        expect(result).toBeNull();
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@example.com', 'Password123!');
        expect(mockNavigate).toHaveBeenCalledWith('/main');
      });
  
      it('should return error message when login fails', async () => {
        getLoginFormErrors.mockReturnValue([]);
        const mockError = { message: 'Invalid email or password' };
        signInWithEmailAndPassword.mockRejectedValue(mockError);
        
        const result = await handleLogin('test@example.com', 'wrongpass', mockNavigate);
        
        expect(result).toBe('Invalid email or password');
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  
    describe('handleStudentSignup', () => {
      it('should validate and create student user', async () => {
        getSignupFormErrors.mockReturnValue([]);
        const mockUserCredential = { user: {} };
        createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
        
        const result = await handleStudentSignup('student@example.com', 'Password123!', 'Student Name', 'Password123!', mockNavigate);
        
        expect(result).toBeNull();
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, 'student@example.com', 'Password123!');
        expect(updateProfile).toHaveBeenCalledWith({}, { displayName: 'Student Name' });
        expect(mockNavigate).toHaveBeenCalledWith('/main');
      });
    });
  
    describe('handleStudentLogin', () => {
      it('should validate and sign in student user', async () => {
        getLoginFormErrors.mockReturnValue([]);
        signInWithEmailAndPassword.mockResolvedValue({});
        
        const result = await handleStudentLogin('student@example.com', 'Password123!', mockNavigate);
        
        expect(result).toBeNull();
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'student@example.com', 'Password123!');
        expect(mockNavigate).toHaveBeenCalledWith('/main');
      });
    });
  
    describe('handlePasswordReset', () => {
      it('should send password reset email when email exists', async () => {
        fetchSignInMethodsForEmail.mockResolvedValue(['password']);
        sendPasswordResetEmail.mockResolvedValue();
        
        const result = await handlePasswordReset('test@example.com');
        
        expect(result).toEqual({ 
          success: true, 
          message: 'Password reset email sent! Please check your inbox.' 
        });
        expect(sendPasswordResetEmail).toHaveBeenCalledWith({}, 'test@example.com');
      });
  
      it('should return error when email does not exist', async () => {
        fetchSignInMethodsForEmail.mockResolvedValue([]);
        
        const result = await handlePasswordReset('nonexistent@example.com');
        
        expect(result).toEqual({ 
          success: false, 
          message: 'No account exists with this email address.' 
        });
        expect(sendPasswordResetEmail).not.toHaveBeenCalled();
      });
  
      it('should return error when password reset fails', async () => {
        fetchSignInMethodsForEmail.mockResolvedValue(['password']);
        const mockError = { message: 'Too many requests' };
        sendPasswordResetEmail.mockRejectedValue(mockError);
        
        const result = await handlePasswordReset('test@example.com');
        
        expect(result).toEqual({ 
          success: false, 
          message: 'Too many requests' 
        });
      });
    });
  
    describe('logout', () => {
      it('should sign out user successfully', async () => {
        signOut.mockResolvedValue();
        
        await logout();
        
        expect(signOut).toHaveBeenCalledWith({});
      });
  
      it('should handle errors during sign out', async () => {
        const mockError = new Error('Network error');
        signOut.mockRejectedValue(mockError);
        
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        
        await logout();
        
        expect(signOut).toHaveBeenCalledWith({});
        expect(consoleSpy).toHaveBeenCalledWith('Logout Error:', mockError);
        
        consoleSpy.mockRestore();
      });
    });
  });