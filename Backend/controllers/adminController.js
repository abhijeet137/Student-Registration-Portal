const User = require("../models/User");


// Admin Dashboard Statistics

const getDashboardStats = async (req, res) => {
  try {
    // Dashboard Cards
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    // Department Statistics
    const departmentStats = await User.aggregate([
      {
        $match: {
          role: "student",
        },
      },
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    // Latest Students
    const latestStudents = await User.find({
      role: "student",
    })
      .select(
        "name rollNumber department semester createdAt"
      )
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,

      stats: {
        totalStudents,
        totalAdmins,
        departments: departmentStats.length,
        semesters: 8,
      },

      departmentStats,

      latestStudents,
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
  getDashboardStats,
};