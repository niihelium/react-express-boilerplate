import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = ({ onRegister, onError }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, email, password);
      onRegister();
    } catch (err) {
      // Propagate error to the parent component
      onError('Error: ' + err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
      <form onSubmit={handleSubmit} style={styles.authForm}>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
        />
        <input
            type="text"
            placeholder="Username"
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
          Register
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

export default Register;