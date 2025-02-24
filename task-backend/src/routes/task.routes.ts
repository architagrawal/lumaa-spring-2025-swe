import { AuthRequest } from "../interfaces/task.interface";

import express, { Response } from "express";
import { auth } from "../middleware/auth";
import { TaskController } from "../controllers/task.controller";

const router = express.Router();
const taskController = new TaskController();

router.post("/add", auth, async (req: AuthRequest, res: Response) => {
  return await taskController.createTask(req, res);
});
router.get("/all", auth, async (req: AuthRequest, res: Response) => {
  return await taskController.getAllTasks(req, res);
});
router.get("/:id", auth, async (req, res) => {
  return await taskController.getTaskById(req, res);
});
router.put("/:id", auth, async (req, res) => {
  return await taskController.updateTask(req, res);
});
router.delete("/:id", auth, async (req, res) => {
  return await taskController.deleteTask(req, res);
});

export { router };
