import React, { useState } from 'react';


const EditRoleModal = ({ user, onUpdateRole, onClose }) => {
  const [newRole, setNewRole] = useState(user.role);

  const handleRoleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleSubmit = () => {
    onUpdateRole(user.id, newRole);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Edit Role</h2>
        <p className="user-name">User: {user.name}</p>
        <label htmlFor="role" className="role-label">New Role:</label>
        <input type="text" id="role" className="role-input" value={newRole} onChange={handleRoleChange} />
        <div className="button-group">
          <button className="save-button" onClick={handleSubmit}>Save</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditRoleModal;