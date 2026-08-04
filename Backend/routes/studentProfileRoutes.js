const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getStudentProfile,
  updateStudentProfile,
} = require("../controllers/studentProfileController");

// ==============================
// Student Profile Routes
// ==============================

// Get Logged-in Student Profile
router.get("/profile", protect, getStudentProfile);

// Update Logged-in Student Profile
router.put("/profile", protect, updateStudentProfile);

module.exports = router;