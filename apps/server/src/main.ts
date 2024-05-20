import cors from 'cors';
import express from 'express';
import { router } from './routes/router';

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.listen(port, () => console.log(`Server is starting in port ${port}`));
