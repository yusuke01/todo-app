import { Router } from 'express';
import pool from '../db';

type Todo = { id: number; title: string; completed: boolean; created_at: string };
const router = Router();

// Get all
router.get('/', async (_, res) => {
  try {
    const [rows] = await pool.query<Todo[]>('SELECT * FROM todos');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'DB error' });
  }
});

// Create
router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  try {
    const [result]: any = await pool.query('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, false]);
    const [rows] = await pool.query<Todo[]>('SELECT * FROM todos WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch {
    res.status(500).json({ error: 'DB error' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    await pool.query('UPDATE todos SET title = ?, completed = ? WHERE id = ?', [title, completed, id]);
    const [rows] = await pool.query<Todo[]>('SELECT * FROM todos WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: 'DB error' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'DB error' });
  }
});

export default router;
