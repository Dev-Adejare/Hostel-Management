import React from 'react'
import "./Register.css"
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div className="container form__ --100vh">
          <div className="form-container">
            <p className="title"> Login As An Admin</p>
    
            <form className="form">
              
    
              <div className="--dir-column">
                <label htmlFor="email">Email:</label>
                <input 
                type="email"
                className="input"
                name="email"
                placeholder="example@yahoo.com"
                required
                />
              </div>
    
              <div className="--dir-column">
                <label htmlFor="password">Password:</label>
                <input 
                type="password"
                className="input"
                name="password"
                placeholder="Enter your password"
                required
                />
              </div>
    
            
    
              <button className="--btn">Login</button>
            </form>
            <p>
                Don&apos;t have an account? <Link to= "/">Register</Link>{" "}
            </p>
          </div>
        </div>
      );
}

export default Login
