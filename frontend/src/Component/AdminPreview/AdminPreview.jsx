import React, { useState } from "react";
import "./AdminPreview.css";
import { CiSearch } from "react-icons/ci";
import UserTable from "./UserTable";
import useAuthRedirect from "../../../context/useAuth";
import axios from axios;

const userData = [
];

const AdminPreview = () => {
  useAuthRedirect();
  const [search, setSearch] = useState("");
  const [adminData, setAdminData] = useState([])
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/admin"
        );
        setAdminData(response.data);
        } catch (error) {
        setIsLoading(false);
        setMessage("Cannot fetch data");
      }finally{
        setIsLoading(false);

      }
    };
    fetchAdmin();
  }, [])

 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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

  const handleUpdateRole = async (Id, newRole) => {
    try {
      const response = await axios.patch(`http://localhost:3500/admin/${Id}`)
      
    } catch (error) {
      
    }
   
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