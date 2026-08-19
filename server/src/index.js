import express from "express";
import recipesRouter from './routes/recipes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/recipes', recipesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});