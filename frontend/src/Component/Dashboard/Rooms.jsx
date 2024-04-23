import { useState } from 'react';
import Sidebar from './Sidebar';


const initialRooms = [
    {
        roomNumber: '101',
        capacity: 4,
        occupacy: 2,
        status: "Available",
        location: "lakeside Manor, Riverside"
    },
    {
        roomNumber: '102',
        capacity: 4,
        occupacy: 2,
        status: "Available",
        location: "lakeside Manor, Riverside"
    },
    {
        roomNumber: '103',
        capacity: 4,
        occupacy: 2,
        status: "Available",
        location: "lakeside Manor, Riverside"
    },
]

const Rooms = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [rooms, setRooms] = useState(initialRooms)
    const [filteredData, setFilteredData] = useState(initialRooms);
}

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

  const handleupdateRoom = (roomNumber, roomStatus) => {
    const updatedRooms = rooms.map((room) =>
room.roomNumber === roomNumber ? {...room, status: newStatus } : room
);
    setRooms(updatedRooms)
    setFilteredData(updatedRooms)

  }

  const handleDeleteRoom = (roomNumber) => {
    const updatedRooms = rooms.filter(
      (room) => room.roomNumber !== roomNumber
    );
    setRooms(updatedRooms);
    setFilteredData(updatedRooms);
  };







