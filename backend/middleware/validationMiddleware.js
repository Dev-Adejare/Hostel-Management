const validator = require("validator");

// Email validation
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (email && !validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email address"
    });
  }
  
  next();
};

// Password validation
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (password) {
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters long"
      });
    }
    
    if (!validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    })) {
      return res.status(400).json({
        success: false,
        error: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      });
    }
  }
  
  next();
};

// Sanitize input
const sanitizeInput = (req, res, next) => {
  // Sanitize string inputs
  const sanitizeObject = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = validator.escape(obj[key].trim());
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  };
  
  if (req.body) {
    sanitizeObject(req.body);
  }
  
  if (req.query) {
    sanitizeObject(req.query);
  }
  
  if (req.params) {
    sanitizeObject(req.params);
  }
  
  next();
};

// Rate limiting (basic implementation)
const rateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    for (const [key, timestamp] of requests.entries()) {
      if (timestamp < windowStart) {
        requests.delete(key);
      }
    }
    
    // Check current requests
    const userRequests = Array.from(requests.entries())
      .filter(([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart)
      .length;
    
    if (userRequests >= max) {
      return res.status(429).json({
        success: false,
        error: "Too many requests, please try again later"
      });
    }
    
    requests.set(`${ip}-${now}`, now);
    next();
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  sanitizeInput,
  rateLimit
};
