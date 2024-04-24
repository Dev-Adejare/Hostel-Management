import React, { useState } from "react";
import "./AdminPreview.css";
import { CiSearch } from "react-icons/ci";
import UserTable from "./UserTable";

const userData = [
  { name: "Kenny", email: "john@example.com", role: "Admin", id: 1 },
  { name: "Zainab ", email: "Zainab@example.com", role: "User", id: 2 },
  { name: "Basirat", email: "Basirat@example.com", role: "Member", id: 3 },
  { name: "Azeez", email: "Azeez@example.com", role: "Admin", id: 4 },
  { name: "Soliu", email: "Soliu@example.com", role: "Member", id: 5 },
];

const AdminPreview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(userData);
  const [filteredData, setFilteredData] = useState(userData); 

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    const updatedFilteredData = filteredData.filter((user) => user.id !== userId);
    setFilteredData(updatedFilteredData);
  };

  const handleUpdateRole = (userId, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
  
    // Update filtered data as well
    const updatedFilteredData = filteredData.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setFilteredData(updatedFilteredData);
  };

  return (
    <div className="__prevCon">
      <h2 className="__prevHeader">Admins</h2>

      <div className="__prevSearchCon">
        <CiSearch className="__prevSearchIcon" />
        <input
          type="text"
          className="__prevSearch"
          placeholder="Search by name or email or role"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="__prevList">
        <UserTable data={filteredData} onDelete={handleDelete}  onUpdateRole={handleUpdateRole}  />
      </div>

      <div className="__inviteBtnCon">
        <button className="__inviteBtn">Invite Admin</button>
      </div>
    </div>
  );
  




};

export default AdminPreview;