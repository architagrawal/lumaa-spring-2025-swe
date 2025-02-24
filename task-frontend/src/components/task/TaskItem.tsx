import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { config } from "../../config/config";
interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  // Ensure that description is always a string by providing a default value
  const [editedTask, setEditedTask] = useState<Task>({
    ...task,
    description: task.description || "",
  });

  const handleToggleComplete = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${config.apiUrl}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...task,
          isComplete: !task.isComplete,
        }),
      });
      onUpdate();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${config.apiUrl}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedTask),
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${config.apiUrl}/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {isEditing ? (
          <Box>
            <TextField
              fullWidth
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Button onClick={handleUpdate} variant="contained" sx={{ mr: 1 }}>
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outlined">
              Cancel
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={task.isComplete}
              onChange={handleToggleComplete}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  textDecoration: task.isComplete ? "line-through" : "none",
                }}
              >
                {task.title}
              </Typography>
              {task.description && (
                <Typography color="textSecondary">
                  {task.description}
                </Typography>
              )}
            </Box>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskItem;
