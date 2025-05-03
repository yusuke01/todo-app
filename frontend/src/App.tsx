import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, Todo } from './api/todo';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await createTodo(newTitle);
    setNewTitle('');
    fetchTodos();
  };

  const handleToggle = async (todo: Todo) => {
    await updateTodo({ ...todo, completed: !todo.completed });
    fetchTodos();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">ToDo App</h1>
      <div className="flex mb-4">
        <input
          className="flex-1 border p-2"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="New task"
        />
        <button className="ml-2 p-2 bg-blue-500 text-white" onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center mb-2">
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo)} />
            <span className={`ml-2 ${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>
            <button className="ml-auto text-red-500" onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
