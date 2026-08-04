const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ===============================
// Get Logged-in Student Profile
// ===============================
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

// ===============================
// Update Logged-in Student Profile
// ===============================
const updateStudentProfile = async (req, res) => {
  try {
    const { phone, address, password } = req.body;

    const student = await User.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Update Phone
    if (phone !== undefined) {
      student.phone = phone;
    }

    // Update Address
    if (address !== undefined) {
      student.address = address;
    }

    // Update Password (Optional)
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      student.password = hashedPassword;
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

module.exports = {
  getStudentProfile,
  updateStudentProfile,
};