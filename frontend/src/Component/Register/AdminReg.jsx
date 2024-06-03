import React, { useEffect, useState } from "react";
import "./Register.css";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const AdminReg = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container form__ --100vh">
          <div className="form-container">
            <p className="title">Create an account</p>
            <form className="form">
              <div className="--dir-column">
                <label htmlFor="name">Full name:</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="name">Email:</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="name">Password:</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="name">Confirm password:</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Re-enter your password"
                  required
                />
              </div>
              <button className="--btn">Create account</button>
            </form>
            <p>
              Already have an account? <Link to="/login">Login</Link> ||{" "}
              <Link to="/homedash">Go Home</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminReg;