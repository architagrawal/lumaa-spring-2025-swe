import { Request } from "express";
export interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId: number;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  isComplete?: boolean;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}
