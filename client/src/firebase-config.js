import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyC80xM2hBGVD6o8bnNRb2ZN-qbkEL3FoG8",
  authDomain: "placement-tool-37b74.firebaseapp.com",
  projectId: "placement-tool-37b74",
  storageBucket: "placement-tool-37b74.firebasestorage.app",
  messagingSenderId: "597031626296",
  appId: "1:597031626296:web:d195b798c448b31adc68cd",
  measurementId: "G-FHD3F1PSSG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };