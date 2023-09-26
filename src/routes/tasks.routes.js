import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { taskValidateSchema } from "../schemas/tasks.schema.js";
const tasksRoutes = Router();

tasksRoutes.get("/tasks", authRequired, getTasks);
tasksRoutes.get("/tasks/:id", authRequired, getTask);
tasksRoutes.post(
  "/tasks/",
  authRequired,
  validateSchema(taskValidateSchema),
  createTask
);
tasksRoutes.delete("/tasks/:id", authRequired, deleteTask);
tasksRoutes.put("/tasks/:id", authRequired, updateTask);

export default tasksRoutes;
