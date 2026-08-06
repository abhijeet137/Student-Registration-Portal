const User = require("../models/User");
const bcrypt = require("bcryptjs");


// Get All Students (With Pagination)

const getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const students = await User.find({ role: "student" })
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalStudents / limit),
      totalStudents,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Student By ID

const getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select("-password");

    if (!student || student.role !== "student") {
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Create Student

const createStudent = async (req, res) => {
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

    name = name.trim();
    email = email.trim().toLowerCase();
    rollNumber = rollNumber.trim();
    department = department.trim();
    phone = phone ? phone.trim() : "";

    // Email Check
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Phone Check
    if (phone) {
      const existingPhone = await User.findOne({ phone });

      if (existingPhone) {
        return res.status(400).json({
          success: false,
          message: "Phone number already exists",
        });
      }
    }

    // Roll Number Check
    const existingRoll = await User.findOne({
      role: "student",
      rollNumber,
      department,
    });

    if (existingRoll) {
      return res.status(400).json({
        success: false,
        message: "Roll Number already exists in this department",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      rollNumber,
      department,
      semester,
      phone,
      address: address ? address.trim() : "",
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
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


// Update Student
const updateStudent = async (req, res) => {
  try {
    let {
      name,
      email,
      rollNumber,
      department,
      semester,
      phone,
      address,
    } = req.body;

    name = name.trim();
    email = email.trim().toLowerCase();
    rollNumber = rollNumber.trim();
    department = department.trim();
    phone = phone ? phone.trim() : "";

    // Email Check
    const existingEmail = await User.findOne({
      email,
      _id: { $ne: req.params.id },
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Phone Check
    if (phone) {
      const existingPhone = await User.findOne({
        phone,
        _id: { $ne: req.params.id },
      });

      if (existingPhone) {
        return res.status(400).json({
          success: false,
          message: "Phone number already exists",
        });
      }
    }

    // Roll Number Check
    const existingRoll = await User.findOne({
      role: "student",
      rollNumber,
      department,
      _id: { $ne: req.params.id },
    });

    if (existingRoll) {
      return res.status(400).json({
        success: false,
        message: "Roll Number already exists in this department",
      });
    }

    const student = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        rollNumber,
        department,
        semester,
        phone,
        address: address ? address.trim() : "",
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
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


// Delete Student

const deleteStudent = async (req, res) => {
  try {
    const student = await User.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};