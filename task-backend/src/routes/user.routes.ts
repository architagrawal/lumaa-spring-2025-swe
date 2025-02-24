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
