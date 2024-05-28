const Room = require("../models/roomModel");
const asyncHandler = require("express-async-handler");

//Create New Room
const createNewRoom = asyncHandler(async (req, res) => {
  const { roomNumber, roomCapacity, roomOccupancy, roomLocation, roomStatus } =
    req.body;

  if (!roomNumber || !roomCapacity || !roomLocation || !roomStatus) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const room = await Room.create({
    roomNumber,
    roomCapacity,
    roomOccupancy,
    roomLocation,
    roomStatus,
  });

  if (room) {
    const {
      _id,
      roomNumber,
      roomCapacity,
      roomOccupancy,
      roomLocation,
      roomStatus,
    } = room;

    res
      .status(201)
      .json({
        _id,
        roomNumber,
        roomCapacity,
        roomOccupancy,
        roomLocation,
        roomStatus,
      });
  } else {
    res.status(400);
    throw new Error("Invalid room data provided, Check again ");
  }
});


//Get all Room
const getAllRoom = asyncHandler(async (req, res) => {
    const rooms = await Room.find().sort("-createdAt");
    if (!rooms) {
      res.status(500);
      throw new Error("Something went wrong");
    }
    res.status(200).json(rooms);
  });
  

module.exports = {
  createNewRoom, getAllRoom,
};
