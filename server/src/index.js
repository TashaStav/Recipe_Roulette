import express from "express";
import recipesRouter from './routes/recipes.js';
import { pool } from './database.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/recipes', recipesRouter);

pool.query('SELECT NOW()').then(() => {
  console.log('Database connected');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});