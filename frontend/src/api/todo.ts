import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export type Todo = { id: number; title: string; completed: boolean; created_at: string };

export const getTodos = () => client.get<Todo[]>('/todos');
export const createTodo = (title: string) => client.post<Todo>('/todos', { title });
export const updateTodo = (todo: Todo) => client.put<Todo>(`/todos/${todo.id}`, todo);
export const deleteTodo = (id: number) => client.delete<{ success: boolean }>(`/todos/${id}`);
