import { Router } from 'express';
import { Controller } from '../controller';

export const postsRouter = Router();

postsRouter.get('/', async (req, res) => {
  try {
    const posts = await Controller.read();
    res.status(200).send(posts);
  } catch {
    res.status(400).send('error fetch data');
  }
});
