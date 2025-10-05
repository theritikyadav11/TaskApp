import express from "express";
import User from "../models/User.js";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find({ role: "user" }).select("-password");

    const usersWithTasks = await Promise.all(
      users.map(async (u) => {
        const taskCount = await Task.countDocuments({ assignedTo: u._id });
        return { ...u.toObject(), totalTasks: taskCount };
      })
    );

    res.json(usersWithTasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const tasks = await Task.find({ assignedTo: user._id });

    res.json({ ...user.toObject(), tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/assign", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const userId = req.params.id;
    const { taskId, title, description, dueDate } = req.body;

    let task;

    if (taskId) {
      task = await Task.findById(taskId);
      if (!task) return res.status(404).json({ message: "Task not found" });
      task.assignedTo = userId;
      if (dueDate) task.dueDate = dueDate;
      await task.save();
    } else {
      task = new Task({
        title,
        description,
        dueDate,
        assignedTo: userId,
      });
      await task.save();
    }

    await User.findByIdAndUpdate(userId, {
      $push: { tasks: task._id },
    });

    res.json({ message: "Task assigned successfully", task });
  } catch (err) {
    console.error("Assign task error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
