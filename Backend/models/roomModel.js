const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room_Number: {
    type: Number,
    required: true,
  },
  room_Capacity: {
    type: Number,
    required: true,
  },
  room_Occupancy: {
    type: String,
    Ref: "Student",
  },
  room_Location: {
    type: String,
    required: true,
  },
  room_Status: {
    type: String,
    default: "Unavailable",
  },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
