const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const Student = require("../models/studentModel");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in cookies first
    if (req.cookies.token) {
      token = req.cookies.token;
    }
    // Check for token in Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user exists
      let user = await Admin.findById(decoded.id);
      if (!user) {
        user = await Student.findById(decoded.id);
      }
      
      if (!user) {
        return res.status(401).json({ message: "Token is not valid" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token is not valid" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: "Server error in authentication" });
  }
};

// Middleware to check if user is admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin privileges required." });
  }
};

// Middleware to check if user is student
const studentOnly = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Student privileges required." });
  }
};

module.exports = { protect, adminOnly, studentOnly };
