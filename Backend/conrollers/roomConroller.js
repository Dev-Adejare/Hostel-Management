const Room = require("../models/roomModel");
const asyncHandler = require("express-async-handler");


//Create New Room
const createNewRoom = asyncHandler(async (req, res) => {

    const { roomNumber, roomCapacity, roomLocation, } = req.body;

    !roomNumber || !roomCapacity || !roomLocation && (() => { res.status(400); throw new Error("please fill all the require fields"); })();

    const roomExists = await Room.findOne({ roomNumber });

    roomExists && (() => { res.status(400); throw new Error("Room number already exists") });


    const room = await Room.create({
        roomNumber, roomCapacity, roomLocation, roomStatus, roomOccupancy,
      });


      if (room) {
        const { _id, roomNumber, roomCapacity, roomLocation, roomStatus } = room;
  
        res.status(201).json({
            _id, roomNumber, roomCapacity, roomLocation, roomStatus, roomOccupancy,
        });
      } else {
        res.status(400);
        throw new Error("Invalid Room Data")
      }

      const roomExist = await Room.findOne({ roomNumber});

      roomExist && (() => {
        res.status(400);
        throw new Error("Room number already exists")
      });


})

//Get all Room
const getAllRoom = asyncHandler(async (req, res) => {
    const rooms = await Room.find().sort();
    if (!rooms) {
      res.status(500);
      throw new Error("Something went wrong");
    }
    res.status(200).json(rooms);
  });

  //Get Room
  const getRoom = asyncHandler (async(req, res) => {
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
  });
  
 
  //Update Room
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

  
  //Delete Room
  const deleteRoom = asyncHandler(async (req, res) => {
  
      const { roomId } = req.params
  
      const room = Room.findById(roomId);
      if (!room) {
          res.status(404);
          throw new Error("room not found in database");
  
      }
  
      await room.deleteOne();
      res.status(200).json({
          message: "room deleted successfully!"
      })
  }
  )



  











module.exports = { createNewRoom, getAllRoom, updateRoom, deleteRoom, getRoom }


  


