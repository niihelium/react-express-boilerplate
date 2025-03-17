import React, { useState } from 'react';
import { loginUser } from '../api';

const Login = ({ onLogin, onError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(username, password);
      localStorage.setItem('token', data.token);
      onLogin();
    } catch (err) {
      // Propagate error to the parent component
      onError('Error: ' + err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
      <form onSubmit={handleSubmit} style={styles.authForm}>
        <input
            type="text"
            placeholder="Username/Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
  );
};

const styles = {
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
};

export default Login;