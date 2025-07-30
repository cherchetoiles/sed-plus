import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { q, rows = 10, start = 0 } = req.query;

  try {
    const response = await axios.get('https://public.opendatasoft.com/api/records/1.0/search/', {
      params: {
        dataset: 'medecins',
        q,
        rows,
        start
      }
    });

    res.json(response.data.records);
  } catch (error) {
    console.error('Erreur :', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des médecins' });
  }
});

export default router;
