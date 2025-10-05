// services/tasks.js
import api from "./api";

// Fetch tasks (with optional params for filters, pagination, admin or user-specific)
export const getTasks = async (params) => {
  const res = await api.get("/tasks", { params });
  return res.data; // returns: { total, page, pages, tasks }
};

// Fetch all tasks assigned to the current authenticated user (user dashboard)
export const getUserTasks = async () => {
  const res = await api.get("/tasks");
  return res.data.tasks;
};

// Fetch a single task by ID (with access control)
export const getTask = async (taskId) => {
  const res = await api.get(`/tasks/${taskId}`);
  return res.data;
};

// Create a new task (user or admin flow)
export const createTask = async (taskData) => {
  const res = await api.post("/tasks", taskData);
  console.log("Create Task API response:", res.data);
  return res.data;
};

// Edit a task completely (title, description, dueDate, priority, assignedTo)
export const updateTask = async (taskId, data) => {
  const res = await api.put(`/tasks/${taskId}`, data);
  return res.data;
};

// Update only the status of a task
export const updateTaskStatus = async (taskId, status) => {
  const res = await api.patch(`/tasks/${taskId}/status`, { status });
  return res.data;
};

// Update only the priority of a task (drag-and-drop)
export const updateTaskPriority = async (taskId, priority) => {
  const res = await api.put(`/tasks/${taskId}`, { priority }); // falls through standard update route
  return res.data;
};

// Delete a task (admin or owner only)
export const deleteTask = async (taskId) => {
  try {
    const res = await api.delete(`/tasks/${taskId}`);
    return res.data; // { message: "Task deleted successfully" }
  } catch (err) {
    // Handle errors gracefully
    console.error("Error deleting task:", err.response?.data || err.message);
    throw err.response?.data || { message: "Failed to delete task" };
  }
};
