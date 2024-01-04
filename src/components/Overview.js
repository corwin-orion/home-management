import React, { useState } from 'react';
import './Overview.css';

const Overview = ({ username, onSignOut, onListSelect, onDeleteList, onAddList, lists }) => {
  const [newListName, setNewListName] = useState('');

  const handleAddList = () => {
    if (newListName.trim() !== '') {
      onAddList(newListName);
      setNewListName('');
    }
  };

  return (
    <div className='overview-container'>
      <h2>Welcome, {username}!</h2>
      <h3>Your Lists:</h3>
      <ul>
        {/* Display existing lists with delete buttons */}
        {lists.map((listName) => (
          <li key={listName}>
            <span onClick={() => onListSelect(listName)}>{listName}</span>
            <button onClick={() => onDeleteList(listName)}>-</button>
          </li>
        ))}
      </ul>
      {/* Add a text field for adding a new list */}
      <input
        type="text"
        placeholder="Enter a new list"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
      />
      <button className='add-button' onClick={handleAddList}>+</button>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

export default Overview;