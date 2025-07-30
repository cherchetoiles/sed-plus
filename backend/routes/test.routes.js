import express from 'express';
import pool from '../config/db.js';

const router = express.Router(); // 👉 Déclaration du router ici

// Route de test simple
router.get('/', (req, res) => {
  res.json({ message: 'Test route ok' });
});

// Route de test connexion PostgreSQL
router.get('/dbtest', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Erreur BDD', details: error.message });
  }
});

export default router;
