import React, { useState } from 'react';
import './Dashboard.css'

const EditStatusModal = ({ room, onUpdateRoom, onClose }) => {
  const [newStatus, setNewStatus] = useState(room.status);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = () => {
    onUpdateRoom(room.roomNumber, newStatus);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Edit Room Status</h2>
        <p className="room-number">Room Number: {room.roomNumber}</p>
        <label htmlFor="status" className="status-label">New Status:</label>

        
        <div className="right">
        <input type="text" id="status" className="search" value={newStatus} 
        onChange={handleStatusChange} />
        </div>
       
       
        <div className="button-group">
          <button className="save-button" onClick={handleSubmit}>Save</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditStatusModal;