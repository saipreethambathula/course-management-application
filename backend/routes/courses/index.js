const express = require("express");
const { validationResult } = require("express-validator");
const Course = require("../../models/course");
const authMiddleware = require("../../middleware/authMiddleware");
const { courseValidation } = require("../../validations/courseValidation");

const router = express.Router();

router.post("/", authMiddleware, courseValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch {
    res.status(500).json({ message: "Failed to create course" });
  }
});

router.get("/", async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to fetch course" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    await course.update(req.body);
    res.json({ message: "Course updated successfully" });
  } catch {
    res.status(500).json({ message: "Failed to update course" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    await course.destroy();
    res.json({ message: "Course deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete course" });
  }
});

module.exports = router;
