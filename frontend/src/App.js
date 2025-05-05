// App.js - Composant principal React
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api';

  // Récupérer les todos au chargement
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fonction pour récupérer les todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/todos`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des todos');
      }
      
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un nouveau todo
  const addTodo = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputValue })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du todo');
      }
      
      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
      setInputValue('');
    } catch (err) {
      setError('Erreur lors de l\'ajout du todo');
      console.error(err);
    }
  };

  // Marquer un todo comme complété ou non
  const toggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !completed })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du todo');
      }
      
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('Erreur lors de la mise à jour du todo');
      console.error(err);
    }
  };

  // Supprimer un todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du todo');
      }
      
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression du todo');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>Ma Todo List</h1>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ajouter une tâche..."
          className="todo-input"
        />
        <button type="submit" className="add-button">Ajouter</button>
      </form>
      
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="todo-list">
          {todos.length === 0 ? (
            <p>Aucune tâche pour le moment</p>
          ) : (
            todos.map(todo => (
              <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <span 
                  className="todo-text"
                  onClick={() => toggleTodo(todo._id, todo.completed)}
                >
                  {todo.text}
                </span>
                <div className="todo-actions">
                  <button 
                    onClick={() => toggleTodo(todo._id, todo.completed)}
                    className="toggle-button"
                  >
                    {todo.completed ? '✓' : '○'}
                  </button>
                  <button 
                    onClick={() => deleteTodo(todo._id)}
                    className="delete-button"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default App;