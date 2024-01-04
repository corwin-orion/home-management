import React, { useState, useEffect, useCallback } from 'react';
import './List.css';

const List = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const loadTodosFromLocalStorage = useCallback(() => {
    try {
      const storedTodos = localStorage.getItem(`todos_${user}`);
      if (storedTodos) {
        setTodos(prevTodos => [...prevTodos, ...JSON.parse(storedTodos)]);
        // console.log('Loaded todos from localStorage:', JSON.parse(storedTodos));
      }
    } catch (error) {
      // console.error('Error loading todos from localStorage:', error);
    }
  }, [user]);

  const saveTodosToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem(`todos_${user}`, JSON.stringify(todos));
      // console.log('Saved todos to localStorage:', todos);
    } catch (error) {
      // console.error('Error saving todos to localStorage:', error);
    }
  }, [user, todos]);

  useEffect(() => {
    // Load todos from localStorage on component mount
    loadTodosFromLocalStorage();
  }, [loadTodosFromLocalStorage]);

  useEffect(() => {
    // Save todos to localStorage whenever the todos state changes
    saveTodosToLocalStorage();
  }, [saveTodosToLocalStorage, todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, id: Date.now() }]);
      setNewTodo('');
    }
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="todo-list-container">
      <h2>Welcome, {user}!</h2>
      <div>
        <h3>Your To-Do List</h3>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => removeTodo(todo.id)}>-</button>
            </li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new list item"
          />
          <button className="add-button" onClick={addTodo}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
