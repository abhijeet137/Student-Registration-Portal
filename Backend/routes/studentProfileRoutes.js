const express = require("express");
const router = express.Router();

// Middleware
const protect = require("../middleware/authMiddleware");
const studentOnly = require("../middleware/studentMiddleware");

// Controllers
const {
  getStudentProfile,
  updateStudentProfile,
  changePassword,
} = require("../controllers/studentProfileController");

// ======================================
// Student Profile Routes
// ======================================

// Get Logged-in Student Profile
router.get(
  "/profile",
  protect,
  studentOnly,
  getStudentProfile
);

// Update Logged-in Student Profile
router.put(
  "/profile",
  protect,
  studentOnly,
  updateStudentProfile
);

// Change Password
router.put(
  "/change-password",
  protect,
  studentOnly,
  changePassword
);

module.exports = router;