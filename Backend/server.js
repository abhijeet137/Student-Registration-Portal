// ======================================
// Import Packages
// ======================================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// ======================================
// Load Environment Variables
// ======================================
dotenv.config();

// ======================================
// Database
// ======================================
const connectDB = require("./config/db");

// ======================================
// Routes
// ======================================
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentProfileRoutes = require("./routes/studentProfileRoutes");

// ======================================
// Connect Database
// ======================================
connectDB();

// ======================================
// Create Express App
// ======================================
const app = express();

// ======================================
// Security Middleware
// ======================================
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// ======================================
// Rate Limiter
// ======================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

// ======================================
// CORS
// ======================================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://student-registration-portal-mmku.vercel.app",
    ],
    credentials: true,
  })
);

// ======================================
// Body Parser
// ======================================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======================================
// Home Route
// ======================================
app.get("/", (req, res) => {
  res.send("🎉 Student Registration Portal Backend is Running!");
});

// ======================================
// API Routes
// ======================================
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentProfileRoutes);

// ======================================
// 404 Handler
// ======================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================================
// Global Error Handler
// ======================================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ======================================
// Start Server
// ======================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});