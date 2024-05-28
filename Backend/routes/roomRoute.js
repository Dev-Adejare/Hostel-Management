const express = require('express');
const {createNewRoom, getAllRoom, getRoom, updateRoom, deleteRoom } = require('../conrollers/roomConroller');
const router = express.Router();

router.post("/create", createNewRoom);
router.get("/", getAllRoom);
router.get("/:roomId", getRoom);
router.patch("/update/:roomId", updateRoom );
router.delete("/delete/:roomId", deleteRoom );



module.exports = router