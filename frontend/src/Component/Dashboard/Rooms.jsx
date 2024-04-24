import { useState } from 'react';
import Sidebar from './Sidebar';
import RoomTable from './RoomTable'



const initialRooms = [
    {
        roomNumber: '101',
        capacity: 4,
        occupancy: 2,
        status: "Available",
        location: "lakeside Manor, Riverside"
    },
    {
        roomNumber: '102',
        capacity: 4,
        occupancy: 2,
        status: "Available",
        location: "lakeside Manor, Riverside"
    },
    {
        roomNumber: '103',
        capacity: 4,
        occupancy: 2,
        status: "Available",
        location: "lakeside Manor, Riverside"
    },
]

const Rooms = () => {
    const [searchTerm, setSearchTerm] = useState('');  // input handler
    const [rooms, setRooms] = useState(initialRooms)  // our data state
    const [filteredData, setFilteredData] = useState(initialRooms);   // filter your data according to input


const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = rooms.filter(
      (room) =>
        room.roomNumber.toLowerCase().includes(term) ||
        room.status.toLowerCase().includes(term)  ||
        room.location.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleAddRoom = () => {

  }

  const handleUpdateRoom = (roomNumber, newStatus) => {
    const updatedRooms = rooms.map((room) =>
      room.roomNumber === roomNumber ? { ...room, status: newStatus } : room
);
    setRooms(updatedRooms);
    setFilteredData(updatedRooms);
  };


  const handleDeleteRoom = (roomNumber) => {
    const updatedRooms = rooms.filter(
      (room) => room.roomNumber !== roomNumber
    );
    setRooms(updatedRooms);
    setFilteredData(updatedRooms);
  };

  return (
    <div className="container --flex-start --gap">
      <Sidebar />
      <div>
        <h1>Hostel Room Listing</h1>
        <input
          placeholder="Search by room number, status, or location"
          type="text"
          className="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <RoomTable
          rooms={filteredData}
          onAddRoom={handleAddRoom}
          onUpdateRoom={handleUpdateRoom}
          onDeleteRoom={handleDeleteRoom}
        />
      </div>
    </div>
  )};


 export default Rooms;






