import { Router } from 'express';
import { Controller } from '../controller';

export const postsRouter = Router();

postsRouter.get('/', async (req, res) => {
  try {
    const posts = await Controller.getPosts();
    res.status(200).send(posts);
  } catch {
    res.status(400).send('error fetch data');
  }
});

postsRouter.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Controller.getPost(id);
    res.status(200).send(post);
  } catch {
    res.status(400).send('error fetch data');
  }
});
