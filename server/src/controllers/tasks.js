import { tasksService } from "../services/tasks.js";
import { success, error } from "../utils/response.js";

export const tasksController = {
getAll(req, res) {
  const { page, limit, completed } = req.query;

  const tasks = tasksService.findAll(
    Number(page),
    Number(limit),
    completed
  );

  res.json(success(tasks));
},

  getById(req, res) {
    const id = parseInt(req.params.id);

    const task = tasksService.findById(id);

    if (!task) {
      return res.status(404).json(error("Task not found", 404));
    }
    res.json(success(task));
  },

  create(req, res) {
    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json(error("Title is required", 400));
    }

    const task = tasksService.create({
      title: title.trim(),
    });
    res.status(201).json(success(task));
  },

  update(req, res) {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    return res
      .status(400)
      .json(error("Title must be a non-empty string", 400));
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json(error("Completed must be a boolean", 400));
  }

  const task = tasksService.update(id, {
    title: title?.trim(),
    completed,
  });

  if (!task) {
    return res.status(404).json(error("Task not found", 404));
  }
  res.json(success(task));
},

  delete(req, res) {
    const id = parseInt(req.params.id);
    const deleted = tasksService.delete(id);

    if (!deleted) {
      return res.status(404).json(error("Task not found", 404));
    }
    res.status(204).send();
  },
};