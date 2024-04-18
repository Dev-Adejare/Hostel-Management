import React from 'react'
import "./Register.css"

const StudentReg = () => { 
  return (
    <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title"> Student Reg Page</p>

        <form className="form">
          <div className="--dir-column">
            <label htmlFor="name">Student's Name:</label>
            <input 
            type="text"
            className="input"
            name="name"
            placeholder="Enter your name"
            required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="email">Age:</label>
            <input 
            type="text"
            className="input"
            name="age"
            placeholder="Enter your age"
            required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="password">Room Number:</label>
            <input 
            type="text"
            className="input"
            name="room number"
            placeholder="Enter your Room number"
            required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="password">Contact Email:</label>
            <input 
            type="text"
            className="input"
            name="email"
            placeholder="example@gmail.com "
            required
            />
          </div>
          <div className="--dir-column">
            <label htmlFor="password">Guardian's Name:</label>
            <input 
            type="text"
            className="input"
            name="name"
            placeholder="Enter your Guardian name "
            required
            />
          </div>
          <div className="--dir-column">
            <label htmlFor="password">Guardian's Email:</label>
            <input 
            type="email"
            className="input"
            name="email"
            placeholder="example@gmail.com"
            required
            />
          </div>

          <button className="--btn">Register</button>
        </form>
       
      </div>
    </div>
  )
}

export default StudentReg
