import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db/index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

const themeSchemas = {
  netflix: z.object({
    name1: z.string().min(1),
    profileImage1: z.string().min(1),
    name2: z.string().min(1),
    profileImage2: z.string().min(1),
    bannerImage: z.string().min(1),
    bannerTitle: z.string().min(1),
    bannerDescription: z.string().min(1),
    movies: z.array(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        coverImage: z.string().min(1),
        videoUrl: z.string().min(1),
      }),
    ),
  }),
  spotify: z.object({
    name1: z.string().min(1),
    name2: z.string().min(1),
    uploadedImage: z.string().min(1),
    caption: z.string().min(1),
  }),
  instagram: z.object({
    name1: z.string().min(1),
    name2: z.string().min(1),
    uploadedImage: z.string().min(1),
    caption: z.string().min(1),
  }),
  polaroid: z.object({
    name1: z.string().min(1),
    name2: z.string().min(1),
    uploadedImage: z.string().min(1),
    caption: z.string().min(1),
    date: z.string().min(1),
  }),
  'love-letter': z.object({
    name1: z.string().min(1),
    name2: z.string().min(1),
    uploadedImage: z.string().min(1),
    caption: z.string().min(1),
  }),
  'love-map': z.object({
    name1: z.string().min(1),
    name2: z.string().min(1),
    uploadedImage: z.string().min(1),
  }),
};

const createSchema = z.object({
  title: z.string().min(1),
  theme: z.enum([
    'netflix',
    'spotify',
    'instagram',
    'polaroid',
    'love-letter',
    'love-map',
  ]),
  data: z.record(z.any()),
});

router.post('/', async (req, res) => {
  const result = createSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }
  const { title, theme, data } = result.data;
  const dataSchema = themeSchemas[theme];
  const dataCheck = dataSchema.safeParse(data);
  if (!dataCheck.success) {
    return res.status(400).json({ error: dataCheck.error.flatten() });
  }
  try {
    const insert = await pool.query(
      'INSERT INTO pages (user_id, title, theme, data) VALUES ($1, $2, $3, $4) RETURNING id, title, theme, data, created_at',
      [req.user.id, title, theme, dataCheck.data],
    );
    const slug = `${dataCheck.data.name1}-${dataCheck.data.name2}`
      .toLowerCase()
      .replace(/\s+/g, '-');
    const shareUrl = `lovelink.com/${req.user.id}/${insert.rows[0].id}/${slug}`;
    res.status(201).json({ ...insert.rows[0], shareUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const query = await pool.query(
      `SELECT p.id, p.title, p.theme, p.data, p.created_at,
              COALESCE(COUNT(e.*) FILTER (WHERE e.type = 'view'), 0) AS views
         FROM pages p
         LEFT JOIN events e ON e.page_id = p.id
         WHERE p.user_id = $1
         GROUP BY p.id
         ORDER BY p.created_at DESC`,
      [req.user.id],
    );
    res.json(query.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id/analytics', async (req, res) => {
  const { id } = req.params;
  try {
    const owner = await pool.query('SELECT user_id FROM pages WHERE id=$1', [id]);
    if (owner.rowCount === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    if (owner.rows[0].user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const totalViews = await pool.query(
      'SELECT COUNT(*) FROM events WHERE page_id=$1 AND type=$2',
      [id, 'view'],
    );
    const uniqueVisitors = await pool.query(
      'SELECT COUNT(DISTINCT user_id) FROM events WHERE page_id=$1 AND type=$2',
      [id, 'view'],
    );
    const dailyViews = await pool.query(
      `SELECT DATE(created_at) AS day, COUNT(*)
         FROM events
         WHERE page_id=$1 AND type=$2 AND created_at > now() - INTERVAL '7 days'
         GROUP BY day
         ORDER BY day`,
      [id, 'view'],
    );
    res.json({
      totalViews: Number(totalViews.rows[0].count),
      uniqueVisitors: Number(uniqueVisitors.rows[0].count),
      dailyViews: dailyViews.rows.map((r) => ({
        day: r.day.toISOString().slice(0, 10),
        views: Number(r.count),
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
