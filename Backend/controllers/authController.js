const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================================
// Register User
// ======================================
const registerUser = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      rollNumber,
      department,
      semester,
      phone,
      address,
    } = req.body;

    // Trim Input
    name = name.trim();
    email = email.trim().toLowerCase();
    rollNumber = rollNumber.trim();
    department = department.trim();
    phone = phone ? phone.trim() : "";
    address = address ? address.trim() : "";

    // ==========================
    // Check Email
    // ==========================
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // ==========================
    // Check Roll Number + Department
    // ==========================
    const rollExists = await User.findOne({
      department,
      rollNumber,
    });

    if (rollExists) {
      return res.status(400).json({
        success: false,
        message: "Roll Number already exists in this department.",
      });
    }

    // ==========================
    // Check Phone Number
    // ==========================
    if (phone) {
      const phoneExists = await User.findOne({ phone });

      if (phoneExists) {
        return res.status(400).json({
          success: false,
          message: "Phone Number already exists.",
        });
      }
    }

    // ==========================
    // Hash Password
    // ==========================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ==========================
    // Create User
    // ==========================
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      rollNumber,
      department,
      semester,
      phone,
      address,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    // MongoDB Duplicate Key Error
    if (error.code === 11000) {
      const fields = Object.keys(error.keyPattern);

      let message = "Duplicate value found.";

      if (fields.includes("email")) {
        message = "Email already exists.";
      } else if (fields.includes("phone")) {
        message = "Phone Number already exists.";
      } else if (
        fields.includes("department") &&
        fields.includes("rollNumber")
      ) {
        message = "Roll Number already exists in this department.";
      }

      return res.status(400).json({
        success: false,
        message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Login User
// ======================================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Current User
// ======================================
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Logout User
// ======================================
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};