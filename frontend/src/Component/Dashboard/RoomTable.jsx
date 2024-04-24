import React, { useState } from "react";
import "./Dashboard.css";
import { RiDeleteBin6Line, RiFilePaperLine } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import EditStatusModal from "./EditStatusModal";
import AddRoomModal from "./AddRoomModal"


// The code you've provided sets up a React component called RoomTable 
// that manages the state for showing a modal and selecting a room. 
// It provides a function openModal to open the modal and update the selected room

const RoomTable = ({ rooms, onAddRoom, onUpdateRoom, onDeleteRoom }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const openModal = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  return (
    <div className="room-table-container">
      <h2>Available Rooms</h2>
      <div className="table">
        <table className="table_wrapper">
          <thead className="table_head">
            <tr className="table__row">
              <th className="same_class">Room Number</th>
              <th className="same_class">Capacity</th>
              <th className="same_class">Occupancy</th>
              <th className="same_class">Location</th>
              <th className="same_class">Status</th>
              <th className="same_class">Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {rooms.map((room, index) => (
              <tr key={index} className="table__row">
                <td className="same_class">{room.roomNumber}</td>
                <td className="same_class">{room.capacity}</td>
                <td className="same_class">{room.occupancy}</td>
                <td className="same_class">{room.location}</td>
                <td className="same_class">{room.status}</td>
                <td className="same_class ">
                  <button onClick={() => openModal(room)} className="_noBg">
                    <FaPen size={25} color="blue" />
                  </button>
                  <button
                    onClick={() => onDeleteRoom(room.roomNumber)}
                    className="_noBg"
                  >
                    <RiDeleteBin6Line size={25} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="right">
        <button onClick={() => setShowAddModal(true)} className="btn-secondary">
          Add New Room
        </button>

        {showAddModal && (
          <AddRoomModal onAddRoom={onAddRoom} onClose={closeAddModal}/>
        )}

        
        {showModal && (
          <EditStatusModal
            room={selectedRoom}
            onUpdateRoom={onUpdateRoom}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default RoomTable;