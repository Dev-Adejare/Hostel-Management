import React, { useState } from "react";
import "./AdminPreview.css";
import { CiSearch } from "react-icons/ci";
import UserTable from "./UserTable";
import { confirmAlert } from "react-confirm-alert";
import useAuthRedirect from "../../../context/useAuth";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

const userData = [];

const AdminPreview = () => {
  useAuthRedirect();
  const [search, setSearch] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:3500/admin");
        setAdminData(response.data);
      } catch (error) {
        setIsLoading(false);
        setMessage("Cannot fetch data");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchAdmin();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting user with id:", id);
    try {
      await axios.delete(`http://localhost:3500/admin/${id}`);
      setAdminData((prevData) => prevData.filter((admin) => admin._id !== id));
      setMessage("Admin deleted Successfully");
    } catch (error) {
      setMessage("Failed to delete admin");
      console.error("Failed to delete admin", error);
    }
  };


const handleUpdateRole = async (id, newRole) => {
  try {
    const response = await axios.patch(`http://localhost:3500/admin/${id}`, {
      role: newRole,
    });
    setAdminData((prevData) =>
      prevData.map((admin) =>
        admin._id === id ? { ...admin, role: response.data.role } : admin
      )
    );
    setMessage("Admin updated Successfully");
  } catch (error) {
    setMessage("Failed to update admin");
    console.error("Failed to update admin", error);
  }
};

const filteredData = adminData.filter(
  (admin) =>
    admin.fullname.toLowerCase().includes(search.toLowerCase()) ||
    admin.email.toLowerCase().includes(search.toLowerCase())
);

return (
  <div className="__prevCon">
    <h2 className="__prevHeader">Admins</h2>

    <div className="__prevSearchCon">
      <CiSearch className="__prevSearchIcon" />
      <input
        type="text"
        className="__prevSearch"
        placeholder="Search by name or email or role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <div className="__prevList">
      <UserTable
        data={filteredData}
        onDelete={handleDelete}
        onUpdateRole={handleUpdateRole}
      />
    </div>

    <div className="__inviteBtnCon">
      <button className="__inviteBtn">Invite Admin</button>
    </div>
  </div>
);

};
export default AdminPreview;
