const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateRollNumber = require("../utils/generateRollNumber");

// ======================================
// Get All Students (Pagination)
// ======================================
const getAllStudents = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalStudents =
      await User.countDocuments({
        role: "student",
      });

    const students =
      await User.find({
        role: "student",
      })
        .select("-password")
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(
        totalStudents / limit
      ),
      totalStudents,
      students,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Get Student By ID
// ======================================
const getStudentById = async (req, res) => {
  try {

    const student =
      await User.findById(
        req.params.id
      ).select("-password");

    if (
      !student ||
      student.role !== "student"
    ) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Create Student
// ======================================
const createStudent = async (req, res) => {
  try {

    let {
      name,
      email,
      password,
      department,
      semester,
      phone,
      address,
    } = req.body;

    // ==========================
    // Trim Input
    // ==========================
    name = name.trim();
    email = email.trim().toLowerCase();
    department = department.trim();
    phone = phone ? phone.trim() : "";
    address = address ? address.trim() : "";

    // ==========================
    // Name Validation
    // ==========================
    if (!/^[A-Za-z\s'-]+$/.test(name)) {
      return res.status(400).json({
        success: false,
        message:
          "Name can contain only letters, spaces, apostrophes (') and hyphens (-).",
      });
    }

    // ==========================
    // Generate Roll Number
    // ==========================
    const rollNumber =
      await generateRollNumber(
        department
      );
          // ==========================
    // Phone Validation
    // ==========================
    if (
      phone &&
      !/^[6-9]\d{9}$/.test(phone)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Phone Number must be a valid 10-digit Indian mobile number.",
      });
    }

    // ==========================
    // Email Check
    // ==========================
    const existingEmail =
      await User.findOne({
        email,
      });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ==========================
    // Phone Check
    // ==========================
    if (phone) {

      const existingPhone =
        await User.findOne({
          phone,
        });

      if (existingPhone) {
        return res.status(400).json({
          success: false,
          message:
            "Phone Number already exists",
        });
      }

    }

    // ==========================
    // Hash Password
    // ==========================
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // ==========================
    // Create Student
    // ==========================
    const student =
      await User.create({
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
      message:
        "Student created successfully",
      student,
    });

  } catch (error) {

    console.log(error);

    if (error.code === 11000) {

      const fields =
        Object.keys(
          error.keyPattern || {}
        );

      let message =
        "Duplicate value found.";

      if (fields.includes("email")) {
        message =
          "Email already exists.";
      }

      else if (
        fields.includes("phone")
      ) {
        message =
          "Phone Number already exists.";
      }

      else if (
        fields.includes("rollNumber")
      ) {
        message =
          "Roll Number already exists.";
      }

      return res.status(400).json({
        success: false,
        message,
      });

    }

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
// ======================================
// Update Student
// ======================================
const updateStudent = async (req, res) => {
  try {

    let {
      name,
      email,
      department,
      semester,
      phone,
      address,
    } = req.body;

    // ==========================
    // Trim Input
    // ==========================
    name = name.trim();
    email = email.trim().toLowerCase();
    department = department.trim();
    phone = phone ? phone.trim() : "";
    address = address ? address.trim() : "";

    // ==========================
    // Name Validation
    // ==========================
    if (!/^[A-Za-z\s'-]+$/.test(name)) {
      return res.status(400).json({
        success: false,
        message:
          "Name can contain only letters, spaces, apostrophes (') and hyphens (-).",
      });
    }

    // ==========================
    // Phone Validation
    // ==========================
    if (
      phone &&
      !/^[6-9]\d{9}$/.test(phone)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Phone Number must be a valid 10-digit Indian mobile number.",
      });
    }

    // ==========================
    // Email Check
    // ==========================
    const existingEmail =
      await User.findOne({
        email,
        _id: {
          $ne: req.params.id,
        },
      });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ==========================
    // Phone Check
    // ==========================
    if (phone) {

      const existingPhone =
        await User.findOne({
          phone,
          _id: {
            $ne: req.params.id,
          },
        });

      if (existingPhone) {
        return res.status(400).json({
          success: false,
          message:
            "Phone Number already exists",
        });
      }

    }
        // ==========================
    // Update Student
    // ==========================
    const student =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          department,
          semester,
          phone,
          address,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

    // ==========================
    // Student Not Found
    // ==========================
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // ==========================
    // Success Response
    // ==========================
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });

  } catch (error) {

    console.log(error);

    if (error.code === 11000) {

      const fields =
        Object.keys(
          error.keyPattern || {}
        );

      let message =
        "Duplicate value found.";

      if (fields.includes("email")) {
        message = "Email already exists.";
      }

      else if (fields.includes("phone")) {
        message =
          "Phone Number already exists.";
      }

      return res.status(400).json({
        success: false,
        message,
      });

    }

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
// ======================================
// Delete Student
// ======================================
const deleteStudent = async (req, res) => {
  try {

    const student =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Student deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
// ======================================
// Export Controllers
// ======================================
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};