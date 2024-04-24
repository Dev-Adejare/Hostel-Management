import React, { useState } from "react";
import "./Dashboard.css";

const AddRoomModal = ({ onAddRoom, onClose }) => {
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    capacity: "",
    occupancy: "",
    status: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onAddRoom(newRoom);
    onClose();
  };

  
};

export default AddRoomModal;