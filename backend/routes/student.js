const express = require("express");
const {
  registerStudent,
  getAllStudents,
  getStudent,
  updateStudentProfile,
  changeStudentRoom,
  updateCheckInStatus,
  deleteStudent,
} = require("../controllers/studentController");
const { protect, adminOnly, studentOnly } = require("../middleware/authMiddleware");
const { validateEmail, validatePassword, sanitizeInput } = require("../middleware/validationMiddleware");

const studentRouter = express.Router();

// Public routes
studentRouter.post("/registerStudent", validateEmail, sanitizeInput, registerStudent);

// Protected routes
studentRouter.use(protect); // All routes below this line require authentication

// Admin-only routes
studentRouter.get("/", adminOnly, getAllStudents);
studentRouter.delete("/delete-student/:_id", adminOnly, deleteStudent);
studentRouter.post("/changeRoom", adminOnly, sanitizeInput, changeStudentRoom);
studentRouter.post("/checkInStatus", adminOnly, sanitizeInput, updateCheckInStatus);

// Student and Admin routes
studentRouter.get("/:_id", getStudent);
studentRouter.patch("/:_id", validateEmail, sanitizeInput, updateStudentProfile);

module.exports = studentRouter;
