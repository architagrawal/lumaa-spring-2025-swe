import { QueryResult } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/database";
import {
  User,
  UserResponse,
  RegisterUserDto,
  LoginUserDto,
} from "../interfaces/user.interface";

export class AuthService {
  private JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

  async registerUser(userData: RegisterUserDto): Promise<UserResponse> {
    const { username, password } = userData;

    const userExists: QueryResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userExists.rows.length > 0) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result: QueryResult<User> = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashedPassword]
    );

    const token = this.generateToken(result.rows[0]);

    return {
      id: result.rows[0].id,
      username: result.rows[0].username,
      token,
    };
  }

  async loginUser(credentials: LoginUserDto): Promise<UserResponse> {
    const { username, password } = credentials;

    const result: QueryResult<User> = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      throw new Error("Invalid username");
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = this.generateToken(user);

    return {
      id: user.id,
      username: user.username,
      token,
    };
  }

  async getUserProfile(userId: number): Promise<User> {
    const result: QueryResult<User> = await pool.query(
      "SELECT id, username FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      throw new Error("User not found");
    }

    return result.rows[0];
  }

  private generateToken(user: { id: number; username: string }): string {
    return jwt.sign({ id: user.id, username: user.username }, this.JWT_SECRET, {
      expiresIn: "24h",
    });
  }

  verifyToken(token: string): { id: number } {
    return jwt.verify(token, this.JWT_SECRET) as { id: number };
  }
}
