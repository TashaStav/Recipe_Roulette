import express from "express";
import tasksRouter from "./routes/tasks.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/tasks", tasksRouter);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});