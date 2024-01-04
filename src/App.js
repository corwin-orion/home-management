// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import TodoList from './TodoList';
import './App.css'; // Import or create a CSS file for App component styling

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  return (
    <div className="app-container">
      {user ? (
        <TodoList user={user} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
