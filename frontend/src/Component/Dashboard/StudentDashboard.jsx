import React from "react";
import Sidebar from "./Sidebar";
import { useState } from "react"; 
import {RiDeleteBin6Line} from "react-icons/ri";
import { Link } from "react-router-dom";


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
];

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(studentsData);
  const [filteredData, setFilteredData] = useState(studentsData);

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

  //handleSearchChange function is an event handler triggered when the value of the search input field changes.
  //It extracts the new search term from the input field, updates the searchTerm state variable,
  //filters the studentsData array based on the search term,
  //and updates the filteredData state variable with the filtered results.

  const handleDelete = (studentId) => {
    const updatedStudents = students.filter(
      (student) => student.id !== studentId
    );
    setStudents(updatedStudents);
    const updatedFilteredData = filteredData.filter(
      (student) => student.id !== studentId
    );
    setFilteredData(updatedFilteredData);
  }; //handleDelete function takes a studentId as input,
  //filters both the students array and the filteredData array to remove the student with that studentId,
  //and updates the state variables students and filteredData with the updated arrays,
  //effectively deleting the student from both lists.

  return (
    <div className="container --flex-start">
      <Sidebar />
      <div className="right">
        <p>Students</p>
        <p>Search students</p>

        <input
          placeholder="Search by name, email, or ID number"
          type="text"
          className="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="table">
          <table className="table_wrapper">
            <thead className="table__head">
              <tr className="table__row">
                <th className="same_class">Student Name</th>
                <th className="same_class">Email</th>
                <th className="same_class">ID Number</th>
                <th className="same_class">Gender</th>
                <th className="same_class">Age</th>
                <th className="same_class">Nationality</th>
                <th className="same_class">Actions</th>
              </tr>
            </thead>

            <tbody className="table__body">
              {filteredData.map((student, index) =>(
                <tr key={index} className="table__row">
                  <td className="same_class">{student.name}</td>
                  <td className="same_class">{student.email}</td>
                  <td className="same_class">{student.idNumber}</td>
                  <td className="same_class">{student.gender}</td>
                  <td className="same_class">{student.age}</td>
                  <td className="same_class">{student.nationality}</td>
                  <td className="same_class">
                    <RiDeleteBin6Line
                    size={25}
                    color='red'
                    onClick={() => handleDelete(student.id)}
                    />

                    


                  </td>

                </tr>
              ))}


            </tbody>
            
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default StudentDashboard;