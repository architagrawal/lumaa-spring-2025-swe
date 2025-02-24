import { Pool } from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "lumaa",
//   password: "root",
//   port: parseInt("5432"),
// });
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

async function setupDatabase(): Promise<void> {
  try {
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        isComplete BOOLEAN DEFAULT FALSE,
        userId INTEGER REFERENCES users(id)
      );
    `);

    // Insert test users with hashed passwords
    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("password456", 10);

    await pool.query(
      `
      INSERT INTO users (username, password) 
      VALUES 
        ('testuser1', $1),
        ('testuser2', $2)
      ON CONFLICT (username) DO NOTHING;
    `,
      [hashedPassword1, hashedPassword2]
    );

    // Get user IDs for the test tasks
    const userResult = await pool.query("SELECT id FROM users LIMIT 2");
    const userId1 = userResult.rows[0].id;
    const userId2 = userResult.rows[1].id;

    // Insert test tasks
    await pool.query(
      `
      INSERT INTO tasks (title, description, isComplete, userId)
      VALUES
        ('Complete project', 'Finish the task management app', FALSE, $1),
        ('Buy groceries', 'Milk, bread, and eggs', TRUE, $1),
        ('Read documentation', 'Study React and Node.js docs', FALSE, $2)
      ON CONFLICT DO NOTHING;
    `,
      [userId1, userId2]
    );

    console.log("Database setup completed successfully");
  } catch (error) {
    console.error("Error setting up database:", error);
  } finally {
    await pool.end();
  }
}

setupDatabase();
