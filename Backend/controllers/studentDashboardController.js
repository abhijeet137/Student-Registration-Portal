const User = require("../models/User");

// Get Student Profile
const getStudentProfile = async (req, res) => {
  try {
    // Use req.user.id because JWT stores "id", not "_id"
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

module.exports = {
  getStudentProfile,
};