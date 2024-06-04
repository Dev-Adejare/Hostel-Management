import React, {useState} from 'react';
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const initialState = {
  name: "",
  age: "",
  roomNum: "",
  email: "",
  gender: "",
  g_name: "",
  g_email: "",
  nationality: ""
};


const StudentReg = () => { 

  const [formData, setFormData] = useState(initialState);
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {name, age, gender, roomNum, email, g_name, g_email, nationality} = formData;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  };

  const registerStudent = async (e) => {
    e.preventDefault();

    if (!name || !age || !gender || !roomNum || !g_name || !email || !g_email || !nationality){
      toast.error("All fields are required");
      return
    }
  }

  return (
    <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title"> Student Registration</p>

        <form className="form">
          <div className="--dir-column">
            <label htmlFor="name">Student&apos;s Name:</label>
            <input 
            type="text"
            className="input"
            name="name"
            placeholder="Enter your name"
            required
            onChange={handleInputChange}
            value={setFormData.name}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="age">Age:</label>
            <input 
            type="text"
            className="input"
            name="age"
            placeholder="Enter age"
            required
            min={0}
            onChange={handleInputChange}
            value={formData.age}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="roomNum">Room Number:</label>
            <input 
            type="text"
            className="input"
            name="roomNum"
            placeholder="Enter room number"
            required
            onChange={handleInputChange}
            value={formData.roomNum}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="email">Contact Email:</label>
            <input 
            type="text"
            className="input"
            name="email"
            placeholder="example@gmail.com "
            required
            onChange={handleInputChange}
            value={formData.email}
            />
          </div>
          <div className="--dir-column">
            <label htmlFor="g_name">Guardian&apos;s Name:</label>
            <input 
            type="text"
            className="input"
            name="name"
            placeholder="Enter your Guardian name "
            required
            onChange={handleInputChange}
            value={formData.g_name}
            />
          </div>
          <div className="--dir-column">
            <label htmlFor="password">Guardian&apos;s Email:</label>
            <input 
            type="email"
            className="input"
            name="email"
            placeholder="example@gmail.com"
            required
            />
          </div>

          <button className="--btn">Add Student</button>
        </form>
       
      </div>
    </div>
  )
}

export default StudentReg
