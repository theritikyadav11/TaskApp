import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// create post
router.post("/", auth, async (req, res) => {
  console.log("Received create task request with data:", req.body);
  try {
    const { title, description, dueDate, priority, assignedTo, status } =
      req.body;
    console.log("Creating task with title:", title);

    const assignedUser = assignedTo || req.user._id;
    const task = await Task.create({
      title,
      description,
      dueDate: dueDate || null,
      priority: priority || "medium",
      assignedTo: assignedUser,
      status: status || "pending",
      createdBy: req.user._id,
    });

    console.log("Task created successfully:", task);
    res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get tasks with pagination and filters
router.get("/", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.user.role !== "admin") {
      filter.assignedTo = req.user._id;
    } else if (req.query.assignedTo) {
      filter.assignedTo = req.query.assignedTo;
    }

    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.status) filter.status = req.query.status;

    const total = await Task.countDocuments(filter);
    const tasks = await Task.find(filter)
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(limit)
      .populate("assignedTo", "name email");

    res.json({ total, page, pages: Math.ceil(total / limit), tasks });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get single task
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );
    if (!task) return res.status(404).json({ message: "Not found" });

    if (
      req.user.role !== "admin" &&
      !task.assignedTo?.equals(req.user._id) &&
      !task.createdBy?.equals(req.user._id)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update task (title, desc, dueDate, priority, assignedTo)
router.put("/:id", auth, async (req, res) => {
  console.log(req.body);
  try {
    const { title, description, dueDate, priority, status, assignedTo } =
      req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Not found" });

    const isOwner = task.createdBy && task.createdBy.equals(req.user._id);

    if (req.user.role !== "user" && !isOwner) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate || null;
    if (priority !== undefined) task.priority = priority;
    if (status !== undefined) task.status = status;
    if (assignedTo !== undefined) task.assignedTo = assignedTo || null;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("PUT /tasks/:id error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update status only
router.patch("/:id/status", auth, async (req, res) => {
  console.log(req.body);
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Not found" });

    if (req.user.role !== "admin" && !task.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await task.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
