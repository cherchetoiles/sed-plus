import express from 'express';
import { createUserWithGoogle } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/google', createUserWithGoogle);

export default router;
