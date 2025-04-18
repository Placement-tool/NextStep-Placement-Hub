import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ApplicationTracker from '../../pages/ApplicationTracker';

jest.mock('../../firebase-config', () => ({
  auth: {},
  firestore: {
    collection: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
      docs: Array(100).fill().map((_, i) => ({
        id: `app-${i}`,
        data: () => ({
          company: `Company ${i}`,
          position: `Position ${i}`,
          status: ['Applied', 'Interview', 'Offer', 'Rejected'][i % 4],
          date: new Date().toISOString()
        })
      }))
    })
  }
}));

jest.mock('../../utils/auth', () => ({
  getCurrentUser: jest.fn(() => ({ 
    uid: 'test-user-id', 
    email: 'test@example.com' 
  }))
}));

describe('ApplicationTracker Performance', () => {
  it('should render within acceptable time', () => {
    const startTime = performance.now();
    
    render(
      <BrowserRouter>
        <ApplicationTracker />
      </BrowserRouter>
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    expect(renderTime).toBeLessThan(1000); // 1000ms threshold
    
    console.log(`ApplicationTracker render time: ${renderTime}ms`);
  });
});