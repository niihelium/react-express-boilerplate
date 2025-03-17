import React, { useState } from 'react';
import { registerUser, loginUser } from '../api';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);  // Switch between login/register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Mock credentials
  const mockUsername = 'user';
  const mockPassword = 'password';

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { data } = await loginUser(username, password);
        localStorage.setItem('token', data.token);
        onLogin();
      } else {
        await registerUser(username, password);
        alert('User registered successfully');
      }
    } catch (err) {
      setError('Error: ' + err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={styles.authContainer}>
      <h2 style={styles.authHeader}>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.authForm}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
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
  authForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #444',
    backgroundColor: '#333',
    color: '#f5f5f5',
    outline: 'none',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
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
