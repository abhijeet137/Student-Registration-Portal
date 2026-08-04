const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Student CRUD Controller
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Dashboard Controller
const {
  getDashboardStats,
} = require("../controllers/adminController");

// ===============================
// Admin Dashboard
// ===============================
router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboardStats
);

// ===============================
// Student CRUD Routes
// ===============================

// Get All Students
router.get(
  "/students",
  protect,
  adminOnly,
  getAllStudents
);

// Get Single Student
router.get(
  "/students/:id",
  protect,
  adminOnly,
  getStudentById
);

// Add Student
router.post(
  "/students",
  protect,
  adminOnly,
  createStudent
);

// Update Student
router.put(
  "/students/:id",
  protect,
  adminOnly,
  updateStudent
);

// Delete Student
router.delete(
  "/students/:id",
  protect,
  adminOnly,
  deleteStudent
);

module.exports = router;