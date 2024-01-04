import React, { useState } from 'react';
import Login from './components/Login';
import Overview from './components/Overview';
import List from './components/List';
import './App.css';

const App = () => {
  const [users, setUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedList, setSelectedList] = useState(null);

  const handleLogin = (username) => {
    setCurrentUser(username);
    // If the user doesn't exist, create an empty set of lists for them
    setUsers((prevUsers) => ({
      ...prevUsers,
      [username]: prevUsers[username] || {},
    }));
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setSelectedList(null);
  };

  const handleListSelect = (listName) => {
    setSelectedList(listName);
  };

  const handleBackToOverview = () => {
    setSelectedList(null);
  };

  const handleDeleteList = (listName) => {
    setUsers((prevUsers) => {
      const updatedUser = { ...prevUsers[currentUser] };
      delete updatedUser[listName];
      return { ...prevUsers, [currentUser]: updatedUser };
    });
    setSelectedList(null); // Clear the selected list if it's deleted
  };

  const handleAddList = (newListName) => {
    setUsers((prevUsers) => ({
      ...prevUsers,
      [currentUser]: {
        ...prevUsers[currentUser],
        [newListName]: [],
      },
    }));
  };

  const handleDeleteItem = (listName, itemName) => {
    setUsers((prevUsers) => {
      const updatedUser = { ...prevUsers[currentUser] };
      updatedUser[listName] = updatedUser[listName].filter((item) => item !== itemName);
      return { ...prevUsers, [currentUser]: updatedUser };
    });
  };

  const handleAddItem = (listName, newItem) => {
    setUsers((prevUsers) => {
      const updatedUser = { ...prevUsers[currentUser] };
      updatedUser[listName] = [...updatedUser[listName], newItem];
      return { ...prevUsers, [currentUser]: updatedUser };
    });
  };

  return (
    <div className="app-container">
      {!currentUser && <Login onLogin={handleLogin} />}
      {currentUser && !selectedList && (
        <Overview
          username={currentUser}
          onSignOut={handleSignOut}
          onListSelect={handleListSelect}
          onDeleteList={handleDeleteList}
          onAddList={handleAddList}
          lists={Object.keys(users[currentUser])}
        />
      )}
      {currentUser && selectedList && (
        <List
          listName={selectedList}
          items={users[currentUser][selectedList]}
          onBack={handleBackToOverview}
          onDeleteItem={handleDeleteItem}
          onAddItem={handleAddItem}
        />
      )}
    </div>
  );
};

export default App;
