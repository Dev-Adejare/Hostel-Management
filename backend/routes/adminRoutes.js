const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");const { validateEmail, validatePassword, sanitizeInput } = require("../middleware/validationMiddleware");

// Public routes (no authentication required)
router.post("/register", validateEmail, validatePassword, sanitizeInput, adminController.register);
router.post("/login", validateEmail, sanitizeInput, adminController.login);

// Protected routes (authentication required)
router.use(protect); // All routes below this line require authentication

// Admin-only routes
router.get("/admins", adminOnly, adminController.getAdmins);
router.get("/:adminId", adminOnly, adminController.getAdmin);
router.patch("/:id", adminOnly, validateEmail, sanitizeInput, adminController.updateAdmin);
router.delete("/:id", adminOnly, adminController.deleteAdmin);
router.post("/logout", adminController.logoutAdmin);

module.exports = router;
