// import express, { Request, Response } from "express";
// import { QueryResult } from "pg";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import pool from "../config/database";
// import {
//   User,
//   UserResponse,
//   RegisterUserDto,
//   LoginUserDto,
// } from "../interfaces/user.interface";

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// // Register new user
// router.post("/register", async (req: Request, res: Response) => {
//   try {
//     const { username, password }: RegisterUserDto = req.body;

//     // Check if user already exists
//     const userExists: QueryResult = await pool.query(
//       "SELECT * FROM users WHERE username = $1",
//       [username]
//     );

//     if (userExists.rows.length > 0) {
//       return res.status(400).json({ error: "Username already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert new user
//     const result: QueryResult<User> = await pool.query(
//       "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
//       [username, hashedPassword]
//     );

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: result.rows[0].id, username: result.rows[0].username },
//       JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     const response: UserResponse = {
//       id: result.rows[0].id,
//       username: result.rows[0].username,
//       token,
//     };

//     res.status(201).json(response);
//   } catch (error) {
//     res.status(400).json({ error: (error as Error).message });
//   }
// });

// // Login user
// router.post("/login", async (req: Request, res: Response) => {
//   try {
//     const { username, password }: LoginUserDto = req.body;
//     console.log({ username, password });
//     // Find user
//     const result: QueryResult<User> = await pool.query(
//       "SELECT * FROM users WHERE username = $1",
//       [username]
//     );
//     if (result.rows.length === 0) {
//       return res.status(401).json({ error: "Invalid username" });
//     }

//     // Check password
//     const user = result.rows[0];
//     const isValidPassword = await bcrypt.compare(password, user.password);

//     if (!isValidPassword) {
//       return res.status(401).json({ error: "Invalid password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user.id, username: user.username },
//       JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     const response: UserResponse = {
//       id: user.id,
//       username: user.username,
//       token,
//     };

//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// });

// // Get user profile
// router.get("/profile", async (req: Request, res: Response) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return res.status(401).json({ error: "Authentication required" });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

//     const result: QueryResult<User> = await pool.query(
//       "SELECT id, username FROM users WHERE id = $1",
//       [decoded.id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// });

// export default router;
import express from "express";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();
const authController = new AuthController();

router.post("/register", async (req, res) => {
  return await authController.register(req, res);
});
router.post("/login", async (req, res) => {
  return await authController.login(req, res);
});
router.get("/profile", async (req, res) => {
  return await authController.getProfile(req, res);
});

export default router;
