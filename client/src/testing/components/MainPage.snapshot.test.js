import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../../pages/MainPage';

// Mock any context providers or hooks that MainPage might use
jest.mock('../../utils/auth', () => ({
  getCurrentUser: jest.fn(() => ({ 
    displayName: 'Test User',
    email: 'test@example.com'
  }))
}));

describe('MainPage Component', () => {
  it('should render correctly and match snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('should match snapshot when no user is logged in', () => {
    require('../../utils/auth').getCurrentUser.mockImplementationOnce(() => null);
    
    const { container } = render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    
    expect(container).toMatchSnapshot();
  });
});