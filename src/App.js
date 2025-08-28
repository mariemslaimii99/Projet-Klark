import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

function App() {
  const [todos, setTodos] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      const data = await response.json();
      setTodos(data.slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = (todo) => {
    const newTodo = {
      ...todo,
      id: Date.now(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    const updatedlist = todos.map((t) => {if (t.id === id) {
      t.completed = !t.completed; 
    }
    return t;
  });
    setTodos(updatedlist);
  };

  const deleteTodo = (id) => {
    const updatedlist = todos.filter((t)=> t.id !== id);
    setTodos(updatedlist);
  };

  const updateTodo = (id, newText) => {
    const updatedlist = todos.map((t)=> 
    t.id=== id? {...t, title : newText}: t
    );

    setTodos(updatedlist);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div> Erreur : {error}</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App - Test Technique</h1>
        <p>Trouvez et corrigez les bugs !</p>
      </header>

      <main className="App-main">
        <TodoForm onAdd={addTodo} />

        <TodoList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
        />

        <TodoStats todos={todos} />
      </main>
    </div>
  );
}

export default App;
