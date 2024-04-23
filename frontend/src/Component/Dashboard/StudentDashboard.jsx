import React from 'react'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { Link } from 'react-router-dom'




const studentsData = [
  {
    id: 1,
    name: "Jessica Smith",
    email: "jessica.smith@gmail.com",
    idNumber: "12345",
    gender: "Female",
    age: 20,
    nationality: "American",
  },
  {
    id: 2,
    name: "Martins Jordan",
    email: "Martins.Jordan@gmail.com",
    idNumber: "12345",
    gender: "Male",
    age: 25,
    nationality: "British",
  },
  {
    id: 3,
    name: "Monica Benice",
    email: "Monica.Benice@gmail.com",
    idNumber: "12345",
    gender: "Female",
    age: 30,
    nationality: "Spanish",
  },
]




const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState('');
  const [filteredData, setFilteredData] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = studentsData.filter(
      (student) =>
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };
    
  return (
    <div>
        <Sidebar />
      <h1>Student</h1>
    </div>
  )
}

export default StudentDashboard