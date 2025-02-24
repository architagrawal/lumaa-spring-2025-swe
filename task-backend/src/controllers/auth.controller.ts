import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const response = await this.authService.registerUser(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const response = await this.authService.loginUser(req.body);
      res.json(response);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const decoded = this.authService.verifyToken(token);
      const user = await this.authService.getUserProfile(decoded.id);
      res.json(user);
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  }
}
