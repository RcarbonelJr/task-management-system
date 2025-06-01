const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// Create task
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create task" });
  }
});

// Get all tasks
router.get("/", auth, async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  try {
    const tasks = await Task.find({ userId: req.user.id, ...filter });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch tasks" });
  }
});

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update task" });
  }
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete task" });
  }
});

module.exports = router;
