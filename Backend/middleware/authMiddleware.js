const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
 
    // Get Token From Cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. Please login first.",
      });
    }


    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

  
    // Find User

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }


    // Attach User to Request
   
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token.",
    });
  }
};

module.exports = protect;