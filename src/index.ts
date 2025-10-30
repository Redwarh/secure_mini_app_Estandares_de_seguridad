import express from 'express';
import cors from 'cors';
import { security } from './middlewares/security.js';
import { errorHandler } from './middlewares/error.js';
import { config } from './config.js';
import { logger } from './logger.js';
import authRoutes from './auth/routes.js';
import userRoutes from './users/routes.js';

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(cors());
app.use(security);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);
app.listen(config.port, () => logger.info(`API on :${config.port}`));
