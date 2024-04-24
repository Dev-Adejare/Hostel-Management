import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditRoleModal from "./EditRoleModal";

const UserTable = ({ data, onDelete, onUpdateRole}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const onEdit = (user) => {
      openModal(user);
    };

  
  
};

export default UserTable;