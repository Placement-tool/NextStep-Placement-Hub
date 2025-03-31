import '@testing-library/jest-dom';

const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('Warning:')) {
    return;
  }
  originalConsoleError(...args);
};