import { Router } from "express";
import { tasksController } from "../controllers/tasks.js";

const router = Router();

router.get("/", tasksController.getAll);
router.get("/:id", tasksController.getById);
router.post("/", tasksController.create);
router.patch("/:id", tasksController.update);
router.delete("/:id", tasksController.delete);

export default router;