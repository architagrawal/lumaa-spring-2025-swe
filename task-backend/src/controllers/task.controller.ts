import { Response } from "express";
import { TaskService } from "../services/task.service";
import { AuthRequest } from "../interfaces/task.interface";
import { auth } from "../middleware/auth";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async createTask(req: AuthRequest, res: Response) {
    try {
      const task = await this.taskService.createTask(req.user!.id, req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAllTasks(req: AuthRequest, res: Response) {
    try {
      const tasks = await this.taskService.getAllTasks(req.user!.id);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getTaskById(req: AuthRequest, res: Response) {
    try {
      const task = await this.taskService.getTaskById(
        parseInt(req.params.id),
        req.user!.id
      );
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateTask(req: AuthRequest, res: Response) {
    try {
      const task = await this.taskService.updateTask(
        parseInt(req.params.id),
        req.user!.id,
        req.body
      );
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteTask(req: AuthRequest, res: Response) {
    try {
      const deleted = await this.taskService.deleteTask(
        parseInt(req.params.id),
        req.user!.id
      );
      if (!deleted) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
