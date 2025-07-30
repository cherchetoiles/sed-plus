import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bienvenue sur l’API Sed+ !');
});

export default router;
