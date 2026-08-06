
// Import Packages

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


// Import Database

const connectDB = require("./config/db");


// Import Routes

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentProfileRoutes = require("./routes/studentProfileRoutes");


// Load Environment Variables

dotenv.config();


// Connect Database

connectDB();


// Create Express App

const app = express();


// Middleware

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite Development
      "https://student-registration-portal-2goy.onrender.com", // Change if your frontend URL is different
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API Routes


// Authentication
app.use("/api/auth", authRoutes);

// Admin
app.use("/api/admin", adminRoutes);

// Student
app.use("/api/student", studentProfileRoutes);


// Home Route

app.get("/", (req, res) => {
  res.send("🎉 Student Registration Portal Backend is Running!");
});

// Handle Unknown Routes

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});


// Start Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});