// ======================================
// Student Authorization Middleware
// ======================================

const studentOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Access Denied. Students Only.",
      });
    }

    next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

module.exports = studentOnly;