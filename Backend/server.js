// ===============================
// Import Packages
// ===============================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// ===============================
// Import Database
// ===============================
const connectDB = require("./config/db");

// ===============================
// Import Routes
// ===============================
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentProfileRoutes = require("./routes/studentProfileRoutes");

// ===============================
// Load Environment Variables
// ===============================
dotenv.config();

// ===============================
// Connect Database
// ===============================
connectDB();

// ===============================
// Create Express App
// ===============================
const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// API Routes
// ===============================

// Authentication Routes
app.use("/api/auth", authRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Student Profile Routes
app.use("/api/student", studentProfileRoutes);

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
  res.send("🎉 Student Registration Portal Backend is Running!");
});

// ===============================
// Handle Unknown Routes
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});