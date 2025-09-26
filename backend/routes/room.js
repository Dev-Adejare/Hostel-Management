const express = require("express");
const {
  createNewRoom,
  getAllRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { sanitizeInput } = require("../middleware/validationMiddleware");

const router = express.Router();

// All room routes require authentication
router.use(protect);

// All room management routes require admin privileges
router.post("/create-room", adminOnly, sanitizeInput, createNewRoom);
router.get("/get-all-room", getAllRoom); // Both admin and student can view rooms
router.get("/get-single-room/:roomId", getRoom); // Both admin and student can view single room
router.patch("/update-room/:roomId", adminOnly, sanitizeInput, updateRoom);
router.delete("/delete-room/:roomId", adminOnly, deleteRoom);

module.exports = router;
