import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router as taskRoutes } from "./routes/task.routes";
import authRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
