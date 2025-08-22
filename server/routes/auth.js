import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { pool } from '../db/index.js';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post('/register', async (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }
  const { email, password } = result.data;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const insert = await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id',
      [email, hashed, 'user'],
    );
    const user = { id: insert.rows[0].id, email, role: 'user' };
    const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'User already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post('/login', async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }
  const { email, password } = result.data;
  try {
    const query = await pool.query('SELECT id, password_hash, role FROM users WHERE email=$1', [email]);
    if (query.rowCount === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const row = query.rows[0];
    const ok = await bcrypt.compare(password, row.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = { id: row.id, email, role: row.role };
    const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
