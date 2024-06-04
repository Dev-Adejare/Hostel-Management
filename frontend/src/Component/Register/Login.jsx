import React, { useState, useCallback, useContext } from "react";
import "./Register.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; //React-Toastify allows you to add notifications to your app with ease.
import PasswordInput from "../PasswordInput/PasswordInput";
import axios from "axios"; //lets developers make requests to either their own or a third-party server to fetch data
import { UserContext } from "../../../context/userContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formValidMessage, setFormValidMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleInputChange = useCallback((e) => {
    setFormValidMessage("");
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const loginUser = useCallback((e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setFormValidMessage("All fields are required");
      return;
    }
    setIsSubmitting(true);

    axios
      .post("http://localhost:3500/admin/register", formData)
      .then((response) => {
        setUser(response.data);
        setIsSubmitting(false);
        toast.success("Login successful");
        navigate("/homedash", { state: { user: response.data } });
      })
      .catch((error) => {
        setIsSubmitting(false);
        const message =
          error.response?.status === 400
            ? "Invalid Login Credentials."
            : "Server error, unable to Login user.";
        setFormValidMessage(message);
      });
  },[formData, navigate, setUser]);

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
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="password">Password:</label>
            <PasswordInput
              type="password"
              className="input"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <button className="--btn">Login</button>
        </form>
        <p>
          Don&apos;t have an account? <Link to="/">Register</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
