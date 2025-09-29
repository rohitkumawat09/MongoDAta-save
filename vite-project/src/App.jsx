import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Load initial tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add or Edit task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    if (editingIndex !== null) {
      // Edit task
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? taskInput : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      // Add task
      setTasks([...tasks, taskInput]);
    }
    setTaskInput('');
  };

  // Edit task
  const handleEdit = (index) => {
    setTaskInput(tasks[index]);
    setEditingIndex(index);
  };

  // Delete task
  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{' '}
            <button onClick={() => handleEdit(index)}>Edit</button>{' '}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
