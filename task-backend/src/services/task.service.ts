import { QueryResult } from "pg";
import pool from "../config/database";
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from "../interfaces/task.interface";

export class TaskService {
  async createTask(userId: number, taskData: CreateTaskDto): Promise<Task> {
    const { title, description } = taskData;
    const result: QueryResult<Task> = await pool.query(
      "INSERT INTO tasks (title, description, isComplete, userId) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, false, userId]
    );
    return result.rows[0];
  }

  async getAllTasks(userId: number): Promise<Task[]> {
    const result: QueryResult<Task> = await pool.query(
      "SELECT * FROM tasks WHERE userId = $1 order by id desc",
      [userId]
    );
    return result.rows;
  }

  async getTaskById(taskId: number, userId: number): Promise<Task | null> {
    const result: QueryResult<Task> = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND userId = $2",
      [taskId, userId]
    );
    return result.rows[0] || null;
  }

  async updateTask(
    taskId: number,
    userId: number,
    updateData: UpdateTaskDto
  ): Promise<Task | null> {
    const { title, description, isComplete } = updateData;
    const result: QueryResult<Task> = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, isComplete = $3 WHERE id = $4 AND userId = $5 RETURNING *",
      [title, description, isComplete, taskId, userId]
    );
    return result.rows[0] || null;
  }

  async deleteTask(taskId: number, userId: number): Promise<boolean> {
    const result: QueryResult<Task> = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND userId = $2 RETURNING *",
      [taskId, userId]
    );
    return result.rows.length > 0;
  }
}
