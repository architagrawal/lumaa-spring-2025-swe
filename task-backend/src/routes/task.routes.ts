// import express, { Response } from "express";
import { QueryResult } from "pg";
// import { auth } from "../middleware/auth";
import pool from "../config/database";
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  AuthRequest,
} from "../interfaces/task.interface";

// const router = express.Router();

// // Create task
// router.post("/add", auth, async (req: AuthRequest, res: Response) => {
//   try {
//     const { title, description } = req.body as CreateTaskDto;
//     const result: QueryResult<Task> = await pool.query(
//       "INSERT INTO tasks (title, description, isComplete, userId) VALUES ($1, $2, $3, $4) RETURNING *",
//       [title, description, false, req.user?.id]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     res.status(400).json({ error: (error as Error).message });
//   }
// });

// // Get all tasks
// router.get("/all", auth, async (req: AuthRequest, res: Response) => {
//   try {
//     const result: QueryResult<Task> = await pool.query(
//       "SELECT * FROM tasks WHERE userId = $1 order by id desc",
//       [req.user?.id]
//     );
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// });

// // Get task by id
// router.get("/:id", auth, async (req: AuthRequest, res: Response) => {
//   try {
//     const result: QueryResult<Task> = await pool.query(
//       "SELECT * FROM tasks WHERE id = $1 AND userId = $2",
//       [req.params.id, req.user!.id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Task not found" });
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// });

// // Update task
// router.put("/:id", auth, async (req: AuthRequest, res: Response) => {
//   try {
//     const { title, description, isComplete } = req.body as UpdateTaskDto;
//     const result: QueryResult<Task> = await pool.query(
//       "UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 AND userId = $5 RETURNING *",
//       [title, description, isComplete, req.params.id, req.user?.id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Task not found" });
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     res.status(400).json({ error: (error as Error).message });
//   }
// });

// // Delete task
// router.delete("/:id", auth, async (req: AuthRequest, res: Response) => {
//   try {
//     const result: QueryResult<Task> = await pool.query(
//       "DELETE FROM tasks WHERE id = $1 AND userId = $2 RETURNING *",
//       [req.params.id, req.user?.id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Task not found" });
//     }
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// });

// export { router };
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
