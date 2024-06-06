import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import RoomTable from "./RoomTable";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Dashboard/Dashboard.css";
import useAuthRedirect from "../../../context/useAuth";
import axios from "axios";

const initialRooms = [];

const Room = () => {
  useAuthRedirect()
  const [roomData, setRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [message, setMessage] = useState("");
  const [isSideBarToggle, setIsSideBarToggle] = useState(false);

  useEffect (() => {
    setIsLoading(true);
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3500/room/get-all-room");
        setRoomData(response.data);
      } catch (error) {
        setIsLoading(false);
        if(error.response && error.response.status === 400){
          setMessage("Cannot fetch rooms...");
        }else{
          setMessage("Server error!")
        }
      }finally {
        setIsLoading(false);
      }

    }
    fetchRooms()
  },[] )







  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState(initialRooms);
  const [filteredData, setFilteredData] = useState(initialRooms);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = rooms.filter(
      (room) =>
        room.roomNumber.toLowerCase().includes(term) ||
        room.status.toLowerCase().includes(term) ||
        room.location.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleAddRoom = (newRoomData) => {
    setRooms([...rooms, newRoomData]);
    setFilteredData([...rooms, newRoomData]);
  };

  const handleUpdateRoom = (roomNumber, newStatus) => {
    const updatedRooms = rooms.map((room) =>
      room.roomNumber === roomNumber ? { ...room, status: newStatus } : room
    );
    setRooms(updatedRooms);
    setFilteredData(updatedRooms);
  };

  const handleDeleteRoom = (roomNumber) => {
    const updatedRooms = rooms.filter((room) => room.roomNumber !== roomNumber);
    setRooms(updatedRooms);
    setFilteredData(updatedRooms);
  };

  return (
    <div>
      <div>
        {isSideBarToggle && (
          <div className="mobile-side-nav">
            <Sidebar />
          </div>
        )}
      </div>

      <div className="--flex --overflow-hidden">
        <div className="desktop-side-nav">
          <Sidebar />
        </div>
        <div className="--flex-dir-column --overflow-y-auto  --flex-1 --overflow-x-hidden">
          <main className="--flex-justify-center w-full">
            <div className="right --dash-main">
              <div className="--flex-justify-between">
                <h1>Hostel Room Listing</h1>

                {isSideBarToggle ? (
                  <FaTimes
                    className="sidebar-toggle-iconB"
                    onClick={() => setIsSideBarToggle(false)}
                  />
                ) : (
                  <FaBars
                    className="sidebar-toggle-iconB"
                    onClick={() => setIsSideBarToggle(true)}
                  />
                )}
              </div>

              <p>Search students</p>

              <input
                placeholder="Search by room number, status, or location"
                type="text"
                className="search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div>
                <RoomTable
                  rooms={filteredData}
                  onAddRoom={handleAddRoom}
                  onUpdateRoom={handleUpdateRoom}
                  onDeleteRoom={handleDeleteRoom}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Room;
