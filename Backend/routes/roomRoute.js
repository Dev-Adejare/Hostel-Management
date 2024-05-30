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

router.post("/createNewRoom", protect, createNewRoom);
router.get("/get-all-room", protect, getAllRoom);
router.get("/:roomId", protect, getRoom);
router.patch("/update-room/:roomId", protect, updateRoom);
router.delete("/delete-room/:roomId", protect, deleteRoom);

module.exports = router;
