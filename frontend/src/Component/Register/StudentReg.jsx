import React from 'react'
import "./Register.css"

const StudentReg = () => { 
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
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="email">Age:</label>
            <input 
            type="text"
            className="input"
            name="age"
            placeholder="20"
            required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="password">Room Number:</label>
            <input 
            type="text"
            className="input"
            name="room number"
            placeholder="001"
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
            <label htmlFor="password">Guardian&apos;s Name:</label>
            <input 
            type="text"
            className="input"
            name="name"
            placeholder="Enter your Guardian name "
            required
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
