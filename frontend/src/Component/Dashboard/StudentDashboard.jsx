import React from "react";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuthRedirect from "../../../context/useAuth";
import { confirmAlert } from "react-confirm-alert";
import { FaPenFancy } from "react-icons/fa";
import UpdateCheckIn from "../../../Modal/updateCheckIn";
import UpdateStudentProfile from "../../../Modal/updateStudentProfile";
import ChangeStudentRoom from "../../../Modal/changeStudentRoom";



const StudentDashboard = () => {
  const [search, setSearch] = useState("");
  const [isSidebarToggle, setIsSidebarToggle] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3500/student/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage(error.message);
      }
    };
    fetchStudents();
  }, []);

  const handleModalOpen = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
    setSelectedModal("");
  };

  const handleModalSelect = (modalType) => {
    setSelectedModal(modalType);
  };

  const removeUser = async (_id) => {
    try {
      console.log(`Delete student by id: ${_id}`);
      const response = await axios.delete(
        `http://localhost:3500/student/delete-student${_id}`
      );
      console.log(response.data);

      //filtering out the deleted student from the data
      setData((prevData) =>
        prevData.filter((student) => student._id !== student._id)
      );

      // setting the success message
      setMessage("Student deleted successfully");

    } catch (error) {
      //setting the error message
      setMessage("Failed to delete student");
      console.error("Error deleting student:", error);
    }
  };

  const confirmDelete = (_id) => {
    confirmAlert({
      title: "Delete this Student",
      message: "Are you sure to delete this student?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(_id),
        },
        {
          label: "cancel",
          onClick: () => ("Deletion cancelled")
        },
      ],
    });
  }

  const filteredData = data.filter(
    (item) =>
      item.nationality.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  )

  
  

  // const handleSearchChange = (e) => {
  //   const term = e.target.value.toLowerCase();
  //   setSearchTerm(term);
  //   const filtered = studentsData.filter(
  //     (student) =>
  //       student.name.toLowerCase().includes(term) ||
  //       student.email.toLowerCase().includes(term)
  //   );
  //   setFilteredData(filtered);
  // };

  //handleSearchChange function is an event handler triggered when the value of the search input field changes.
  //It extracts the new search term from the input field, updates the searchTerm state variable,
  //filters the studentsData array based on the search term,
  //and updates the filteredData state variable with the filtered results.

  // const handleDelete = (studentId) => {
  //   const updatedStudents = students.filter(
  //     (student) => student.id !== studentId
  //   );
  //   setStudents(updatedStudents);
  //   const updatedFilteredData = filteredData.filter(
  //     (student) => student.id !== studentId
  //   );
  //   setFilteredData(updatedFilteredData);
  // }; //handleDelete function takes a studentId as input,
  //filters both the students array and the filteredData array to remove the student with that studentId,
  //and updates the state variables students and filteredData with the updated arrays,
  //effectively deleting the student from both lists.

  return (
    <div>
      {isSidebarToggle && (
        <div className="mobile-side-nav">
          <Sidebar />
        </div>
      )}

      <div className="--flex --overflow-hidden">
        <div className="desktop-side-nav">
          <Sidebar />
        </div>

        <div className="--flex-dir-column --overflow-y-auto --flex-1 --overflow-x-hidden">
          <main className="--flex-justify-center w-full">
            <div className="right dash-main">
              <div className="--flex-justify-between">
                <p>Students</p>
                {isSidebarToggle ? (
                  <FaTimes
                    className="sidebar-toggle-iconB"
                    onClick={() => setIsSidebarToggle(false)}
                  />
                ) : (
                  <FaBars
                    className="sidebar-toggle-iconB"
                    onClick={() => setIsSidebarToggle(true)}
                  />
                )}
              </div>

              <p>Search students</p>

              <input
                placeholder="Search by name, email, or ID number"
                type="text"
                className="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                    {filteredData.map((student, index) => (
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
                            color="red"
                            onClick={() => confirmDelete(student._id)}
                          />
                          &nbsp;&nbsp;
                          <FaPenFancy
                            size={25}
                            color="blue"
                            onClick={() => handleModalOpen(student)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button className="btn-secondary">
                <Link to="/student-reg">Add a student</Link>
              </button>
            </div>
          </main>
        </div>
      </div>

      {isModalOpen
      && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select an Option</h2>
            <button onClick={()=> handleModalSelect("UpdateStudentProfile")}
            className="one">
              Update Student Profile
            </button>
            
            <button onClick={()=> handleModalSelect("ChangeStudentRoom")}
            className="two">Change Student Room</button>
            
            <button onClick={()=> handleModalSelect("dateCheckIn")}
            className="three">Update-Check-In</button>
            
            <button onClick={()=> handleModalSelect("Close")}>Close</button>

          </div>
        </div>
      )}

      {selectedModal === "UpdateStudentProfile" &&(
        <UpdateStudentProfile
          student={selectedStudent}
          onClose={handleModalClose}
        />
      )}
      {selectedModal === "ChangeStudentRoom" &&(
        <ChangeStudentRoom
          student={selectedStudent}
          onClose={handleModalClose}
        />
      )}
      {selectedModal === "UpdateCheckIn" &&(
        <UpdateCheckIn
          student={selectedStudent}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
