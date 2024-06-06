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

router.post("/createNewRoom",  createNewRoom);
router.get("/get-all-room",  getAllRoom);
router.get("/:roomId",  getRoom);
router.patch("/update-room/:roomId",  updateRoom);
router.delete("/delete-room/:roomId",  deleteRoom);

module.exports = router;
