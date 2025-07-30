import express from 'express';
import cors from 'cors';
import testRoutes from './routes/test.routes.js';
import indexRoutes from './routes/index.js';
import professionalsRoutes from './routes/professionals.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', indexRoutes);
app.use('/api/test', testRoutes);
app.use('/api/professionals', professionalsRoutes);


export default app;
