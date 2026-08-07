const express = require("express");
const router = express.Router();

// Middleware
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Controllers
const {
  getDashboardStats,
} = require("../controllers/adminController");

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// ======================================
// Admin Dashboard
// ======================================

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboardStats
);

// ======================================
// Student Management
// ======================================

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

// Create Student
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