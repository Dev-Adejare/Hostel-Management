const express = require("express");
const {
  createNewRoom,
  getAllRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../conrollers/roomConroller");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createNewRoom);
router.get("/", protect, getAllRoom);
router.get("/:roomId", protect, getRoom);
router.patch("/update/:roomId", protect, updateRoom);
router.delete("/delete/:roomId", protect, deleteRoom);

module.exports = router;
