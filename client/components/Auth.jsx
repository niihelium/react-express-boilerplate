import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true); // Switch between login/register
  const [error, setError] = useState(''); // Centralized error state

  // Callback function to handle errors from child components
  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev); // Toggle between Login and Register
    setError(''); // Clear error message
  };

  return (
      <div style={styles.authContainer}>
        <h2 style={styles.authHeader}>{isLogin ? 'Login' : 'Register'}</h2>
        {error && <p style={styles.error}>{error}</p>} {/* Display error */}
        {isLogin ? (
            <Login onLogin={onLogin} onError={handleError} />
        ) : (
            <Register onRegister={() => alert('User registered successfully')} onError={handleError} />
        )}
        <button onClick={toggleAuthMode} style={styles.toggleButton}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
  );
};

const styles = {
  authContainer: {
    backgroundColor: '#2a2a2a',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  authHeader: {
    marginBottom: '20px',
    color: '#f5f5f5',
  },
  toggleButton: {
    marginTop: '10px',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#4CAF50',
    cursor: 'pointer',
  },
  error: {
    color: '#ff6b6b',
    marginBottom: '10px',
  },
};

export default Auth;