import express from 'express';
import { createUser } from '../controllers/user.controller.js';

const router = express.Router();

// route pour créer un utilisateur
router.post('/', createUser);

export default router;
