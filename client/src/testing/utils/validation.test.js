import {
    getSignupFormErrors,
    getLoginFormErrors,
    isValidEmail
  } from '../../utils/validation'; 
  
  beforeEach(() => {
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
  
  describe('Validation Utilities', () => {
    describe('isValidEmail', () => {
      it('should validate email formats', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('invalid')).toBe(false);
      });
    });
  
    describe('getSignupFormErrors', () => {
      it('should validate signup form', () => {
        expect(getSignupFormErrors('name', 'test@test.com', 'password', 'password')).toEqual([]);
        expect(getSignupFormErrors('', 'invalid', 'short', 'mismatch').length).toBeGreaterThan(0);
      });
    });
  
    describe('getLoginFormErrors', () => {
      it('should validate login form', () => {
        expect(getLoginFormErrors('test@test.com', 'password')).toEqual([]);
        expect(getLoginFormErrors('invalid', '').length).toBeGreaterThan(0);
      });
    });
  });