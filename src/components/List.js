import React, { useState } from 'react';
import './List.css';

const List = ({ listName, items, onBack, onDeleteItem, onAddItem }) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      onAddItem(listName, newItem);
      setNewItem('');
    }
  };

  return (
    <div className='list-container'>
      <h2>{listName}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => onDeleteItem(listName, item)}>-</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter a new item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button className='add-button' onClick={handleAddItem}>+</button>
      <button onClick={onBack}>Back to Overview</button>
    </div>
  );
};

export default List;
