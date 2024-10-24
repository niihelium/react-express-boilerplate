import React, { useState } from 'react';
import Auth from './components/Auth';
import Notes from './components/Notes';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>Note Taking App</h1>
      {isAuthenticated ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <Notes />
        </div>
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
