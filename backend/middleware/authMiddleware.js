const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Protect Routes
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get Token
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find User (Exclude Password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      return res.status(401).json({
        message: "Not Authorized. No Token Found.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or Expired Token",
    });
  }
};

// Admin Middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Access Denied. Admin Only.",
    });
  }
};

module.exports = {
  protect,
  admin,
};