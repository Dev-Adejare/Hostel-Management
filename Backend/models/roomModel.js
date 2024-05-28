const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
  },
  roomCapacity: {
    type: Number,
    required: true,
  },
  roomOccupancy: [{
    type: String,
    Ref: "Student",
  }],
  roomLocation: {
    type: String,
    required: true,
  },
  roomStatus: {
    type: String,
    default: "Unavailable",
  },
}, {timestamps: true });

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
