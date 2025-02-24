import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export default pool;
// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config({ path: path.join(process.cwd(), "../../.env") });

// const sequelize = new Sequelize({
//   dialect: "postgres",
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: parseInt(process.env.DB_PORT || "5432"),
// });

// export default sequelize;
