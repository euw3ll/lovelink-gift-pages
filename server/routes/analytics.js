import { Router } from 'express';
import { pool } from '../db/index.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', requireRole('admin'), async (_req, res) => {
  try {
    const totalUsers = await pool.query('SELECT COUNT(*) FROM users');
    const totalEvents = await pool.query('SELECT COUNT(*) FROM events');
    res.json({
      users: Number(totalUsers.rows[0].count),
      events: Number(totalEvents.rows[0].count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
