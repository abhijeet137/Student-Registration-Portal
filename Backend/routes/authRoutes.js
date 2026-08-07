const express = require("express");
const router = express.Router();

// ======================================
// Middleware
// ======================================
const protect = require("../middleware/authMiddleware");

// ======================================
// Controllers
// ======================================
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/authController");

// ======================================
// Public Routes
// ======================================

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// ======================================
// Protected Routes
// ======================================

// Get Logged In User
router.get("/me", protect, getCurrentUser);

// Logout User
router.post("/logout", protect, logoutUser);

module.exports = router;