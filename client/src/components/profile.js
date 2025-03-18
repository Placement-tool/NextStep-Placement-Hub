import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { 
  onAuthStateChanged, 
  signOut, 
  updateProfile, 
  updatePassword, 
  EmailAuthProvider, 
  reauthenticateWithCredential 
} from "firebase/auth";
import '../public/style.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '', visible: false });
  
  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed", currentUser ? currentUser.email : "no user");
      
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
        setLoading(false);
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  const handleBackToMain = () => {
    console.log("Navigating to /main");
    navigate('/main');
  };

  const handleLogout = () => {
    console.log("Logout button clicked");
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful, redirecting to login");
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
        showStatus('error', 'Error logging out: ' + error.message);
      });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDisplayName(user.displayName || '');
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    if (user) {
      showStatus('info', 'Updating profile...');
      
      updateProfile(user, {
        displayName: displayName
      }).then(() => {
        setIsEditing(false);
        setUser({...user, displayName});
        showStatus('success', 'Profile updated successfully!');
      }).catch((error) => {
        showStatus('error', 'Error updating profile: ' + error.message);
      });
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      showStatus('error', 'New passwords do not match!');
      return;
    }
    
    if (user) {
      const credential = EmailAuthProvider.credential(
        user.email, 
        currentPassword
      );
      
      showStatus('info', 'Updating password...');
      
      reauthenticateWithCredential(user, credential)
        .then(() => updatePassword(user, newPassword))
        .then(() => {
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          showStatus('success', 'Password updated successfully!');
        })
        .catch((error) => {
          showStatus('error', 'Error: ' + error.message);
        });
    }
  };

  const showStatus = (type, message) => {
    setStatusMessage({ type, message, visible: true });
    
    // Hide message after 5 seconds
    setTimeout(() => {
      setStatusMessage(prev => ({ ...prev, visible: false }));
    }, 5000);
  };

  if (loading) {
    return <div className="wrapper">Loading...</div>;
  }

  // Custom styling for profile page that matches your existing CSS
  const profileContainerStyle = {
    width: '100%',
    maxWidth: '100%',
    margin: '20px auto'
  };

  const profileSectionStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const profileInfoStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '10px',
    marginBottom: '10px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left'
  };

  const profileActionsStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  };

  const buttonStyle = {
    border: 'none',
    borderRadius: '1000px',
    padding: '.85em 2em',
    backgroundColor: 'var(--accent-color)',
    color: 'var(--base-color)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: '150ms ease',
    whiteSpace: 'nowrap'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'var(--input-color)'
  };

  const inputStyle = {
    boxSizing: 'border-box',
    width: '100%',
    padding: '12px',
    border: '2px solid var(--accent-color)',
    borderRadius: '10px',
    marginBottom: '15px',
    transition: '150ms ease',
    backgroundColor: 'white'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    padding: '5px 0',
    color: 'var(--text-color)',
    fontWeight: 'bold',
    width: '200px',
    minWidth: '200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'transparent'
  };

  const backButtonStyle = {
    display: 'block',
    marginBottom: '20px',
    textDecoration: 'none',
    color: 'var(--accent-color)',
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer'
  };

  const userSectionStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15px',
    flexWrap: 'wrap',
    gap: '15px'
  };

  const statusMessageStyle = {
    padding: '10px',
    borderRadius: '10px',
    margin: '10px auto',
    maxWidth: '500px',
    textAlign: 'center',
    backgroundColor: statusMessage.type === 'success' ? '#d4edda' : 
                    statusMessage.type === 'error' ? '#f8d7da' : 
                    statusMessage.type === 'info' ? '#d1ecf1' : 'transparent',
    color: statusMessage.type === 'success' ? '#155724' : 
          statusMessage.type === 'error' ? '#721c24' : 
          statusMessage.type === 'info' ? '#0c5460' : 'inherit'
  };

  return (
    <div className="wrapper" style={{ height: 'auto', maxHeight: '90vh', width: 'min(800px, 90%)', overflowY: 'auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Your Profile</h1>
        <div style={userSectionStyle}>
          <p>
            Hello, {user.displayName || 'User'}! You are logged in with {user.email}.
          </p>
          <button onClick={handleLogout} style={buttonStyle}>Log Out</button>
        </div>
      </header>

      <button onClick={handleBackToMain} style={backButtonStyle}>← Back to Application Tracker</button>

      <div style={profileContainerStyle}>
        {!isEditing ? (
          <div style={profileSectionStyle}>
            <h2 style={{ color: 'var(--text-color)', marginBottom: '20px', textAlign: 'center' }}>Profile Information</h2>
            <dl style={profileInfoStyle}>
              <dt style={{ fontWeight: 'bold', color: 'var(--text-color)' }}>Display Name</dt>
              <dd style={{ color: 'var(--text-color)' }}>{user.displayName || 'Not set'}</dd>
              
              <dt style={{ fontWeight: 'bold', color: 'var(--text-color)' }}>Email</dt>
              <dd style={{ color: 'var(--text-color)' }}>{user.email}</dd>
              
              <dt style={{ fontWeight: 'bold', color: 'var(--text-color)' }}>Member Since</dt>
              <dd style={{ color: 'var(--text-color)' }}>
                {user.metadata ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Loading...'}
              </dd>
              
              <dt style={{ fontWeight: 'bold', color: 'var(--text-color)' }}>Last Login</dt>
              <dd style={{ color: 'var(--text-color)' }}>
                {user.metadata 
                  ? `${new Date(user.metadata.lastSignInTime).toLocaleDateString()} ${new Date(user.metadata.lastSignInTime).toLocaleTimeString()}`
                  : 'Loading...'}
              </dd>
            </dl>
            <div style={profileActionsStyle}>
              <button onClick={handleEditProfile} style={buttonStyle}>Edit Profile</button>
            </div>
          </div>
        ) : (
          <div style={profileSectionStyle}>
            <h2 style={{ color: 'var(--text-color)', marginBottom: '20px', textAlign: 'center' }}>Edit Profile</h2>
            <form onSubmit={handleProfileSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
              <label htmlFor="display-name" style={labelStyle}>Display Name</label>
              <input 
                type="text" 
                id="display-name" 
                name="display-name"
                style={inputStyle}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              
              <div style={profileActionsStyle}>
                <button type="button" onClick={handleCancelEdit} style={secondaryButtonStyle}>Cancel</button>
                <button type="submit" style={buttonStyle}>Save Changes</button>
              </div>
            </form>
          </div>
        )}

        <div style={profileSectionStyle}>
          <h2 style={{ color: 'var(--text-color)', marginBottom: '20px', textAlign: 'center' }}>Password Management</h2>
          <form onSubmit={handlePasswordSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <label htmlFor="current-password" style={labelStyle}>Current Password</label>
            <input 
              type="password" 
              id="current-password" 
              name="current-password"
              style={inputStyle}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            
            <label htmlFor="new-password" style={labelStyle}>New Password</label>
            <input 
              type="password" 
              id="new-password" 
              name="new-password"
              style={inputStyle}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            
            <label htmlFor="confirm-password" style={labelStyle}>Confirm New Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirm-password"
              style={inputStyle}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
            <div style={profileActionsStyle}>
              <button type="submit" style={buttonStyle}>Update Password</button>
            </div>
          </form>
        </div>

        {statusMessage.visible && (
          <div style={statusMessageStyle}>
            {statusMessage.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;