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







