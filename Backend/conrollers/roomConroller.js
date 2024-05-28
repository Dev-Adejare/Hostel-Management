const Room = require("../models/roomModel");
const asyncHandler = require("express-async-handler");

const createNewRoom = asyncHandler(async (req, res) => {
  const { roomNumber, roomCapacity, roomOccupancy, roomLocation, roomStatus } = req.body;

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
    const { _id,  roomNumber, roomCapacity,  roomOccupancy, roomLocation, roomStatus } = room;

    res.status(201).json({ _id,  roomNumber, roomCapacity,  roomOccupancy, roomLocation, roomStatus });
  } else {
    res.status(400);
    throw new Error("Invalid room data provided, Check again ");
  }
});

const getAllRoom = asyncHandler(async (req, res) => {
  const rooms = await Room.find().sort("-createdAt");
  if (!rooms) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(rooms);
});

const getRoom = async (req, res) => {
  const roomId = req.params.roomId;

  try {
    const room = await Room.findById(roomId);

    if (room ) {
      const { _id,  roomNumber, roomCapacity,  roomOccupancy, roomLocation, roomStatus } = room;

      res.status(200).json({ _id,  roomNumber, roomCapacity,  roomOccupancy, roomLocation, roomStatus });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateRoom = asyncHandler(async (req, res) => {
    const roomId = req.params.roomId;
  
    try {
      const room = await Room.findById(roomId);
  
      if (room) {
        const { _id,  roomNumber, roomCapacity,  roomOccupancy, roomLocation, roomStatus } = room;
  
        room.roomNumber = req.body.roomNumber || roomNumber;
        room.roomCapacity = req.body.roomCapacity || roomCapacity;
        room.roomOccupancy = req.body.roomOccupancy || roomOccupancy;
        room.roomLocation = req.body.roomLocation || roomLocation;
        room.roomStatus  = req.body.roomStatus  || roomStatus ;
        
  
        const updatedRoom = await room.save();
  
        res.status(201).json({
          _id: updatedRoom._id,
          roomStatus : updatedRoom.roomStatus ,
          roomCapacity: updatedRoom.roomCapacity,
          roomOccupancy: updatedRoom.roomOccupancy,
          roomLocation: updatedRoom.roomLocation,
          roomStatus: updatedRoom.roomStatus,
          
        });
      } else {
        res.status(404);
        throw new Error("Room not found");
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const deleteRoom = asyncHandler(async (req, res) => {
    const roomId = req.params.roomId;
    try {
      const room = Room.findById(roomId);
  
      if (!room) {
        res.status(404);
        throw new Error("Room not found");
      }
  
      await room.deleteOne();
      res.status(200).json({
        message: "Room deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = {
    createNewRoom,
    getAllRoom,
    getRoom,
    updateRoom,
    deleteRoom
  }
  