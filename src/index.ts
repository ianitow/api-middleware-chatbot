import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import Database from './config/database';

import cors from 'cors';
import routes from './routes';
config();
const app = express();
const db = Database();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.get('/', (req, res, next) => {
  res.send('Hello world');
});
app.listen(PORT, () => {
  console.log('✅ Express Connected');
});
