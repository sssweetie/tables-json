import { Router } from 'express';
import { postsRouter } from './postsRouter';

export const router = Router();

router.use('/posts', postsRouter);
