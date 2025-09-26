require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorMiddleware");
const { sanitizeInput, rateLimit: customRateLimit } = require("./middleware/validationMiddleware");
const connectDb = require("./config/DBConnect");
const roomRoute = require("./routes/room");
const adminRoute = require("./routes/adminRoutes");
const studentRoute = require("./routes/student");
const PORT = process.env.PORT || 3500;

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));

// Input sanitization
app.use(sanitizeInput);

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "https://hostel-mgmt-two.vercel.app",
  "https://hostel-mgmt-bopd.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200
  })
);

// Routes
app.use("/room", roomRoute);
app.use("/admin", adminRoute);
app.use("/students", studentRoute);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Hostel Management API", 
    status: "running",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Database connection
connectDb();

mongoose.connection.once("open", () => {
  console.log("âœ… Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`íº€ Server running on port ${PORT}`);
    console.log(`í³± Environment: ${process.env.NODE_ENV}`);
    console.log(`í¼ CORS enabled for: ${allowedOrigins.join(", ")}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("âŒ MongoDB connection error:", err);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\ní»‘ Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("í³¦ MongoDB connection closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("\ní»‘ SIGTERM received, shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("í³¦ MongoDB connection closed");
    process.exit(0);
  });
});
