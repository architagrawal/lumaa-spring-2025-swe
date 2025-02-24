import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { config } from "../../config/config";
import { Task } from "../../types/task.types";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${config.apiUrl}/tasks/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      // Ensure data is an array
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]);
        console.error("Expected array of tasks but got:", data);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error fetching tasks");
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Tasks
        </Typography>

        <TaskForm onTaskCreated={fetchTasks} />

        <Box sx={{ mt: 4 }}>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}

          {!error && tasks.length === 0 ? (
            <Typography color="textSecondary" align="center">
              No tasks yet. Create one above!
            </Typography>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={fetchTasks}
                onDelete={fetchTasks}
              />
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default TaskList;
