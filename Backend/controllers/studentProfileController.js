const User = require("../models/User");
const bcrypt = require("bcryptjs");


// Get Logged-in Student Profile

const getStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id).select("-password");

    if (!student) {
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
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Logged-in Student Profile

const updateStudentProfile = async (req, res) => {
  try {
    const { phone, address } = req.body;

    const student = await User.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (phone !== undefined) {
      student.phone = phone;
    }

    if (address !== undefined) {
      student.address = address;
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        department: student.department,
        semester: student.semester,
        phone: student.phone,
        address: student.address,
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


// Change Password

const changePassword = async (req, res) => {
  try {

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const student = await User.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      student.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    student.password = await bcrypt.hash(newPassword, 10);

    await student.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getStudentProfile,
  updateStudentProfile,
  changePassword,
};