import express from "express";
import recipesRouter from "./routes/recipes.js";
import shoppingItemsRouter from "./routes/shoppingItems.js";
import { pool } from "./database.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/recipes", recipesRouter);
app.use("/api/shopping-list", shoppingItemsRouter);

pool.query("SELECT NOW()").then(() => {
  console.log("Database connected");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
