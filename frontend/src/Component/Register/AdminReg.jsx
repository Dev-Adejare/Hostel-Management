import React, { useState, useCallback, useContext } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../PasswordInput/PasswordInput";
import { UserContext } from "../../../context/userContext";
import api from "../../config/api";

const AdminReg = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formValidMessage, setFormValidMessage] = useState("");
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

  const validateForm = () => {
    const { fullname, email, password, confirmPassword } = formData;

    if (!fullname || !email || !password || !confirmPassword) {
      setFormValidMessage("All fields are required");
      return false;
    }

    if (fullname.length < 2) {
      setFormValidMessage("Full name must be at least 2 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormValidMessage("Please enter a valid email address");
      return false;
    }

    if (password.length < 6) {
      setFormValidMessage("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      setFormValidMessage("Passwords do not match");
      return false;
    }

    return true;
  };

  const registerAdmin = useCallback(
    (event) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);

      const { confirmPassword, ...submitData } = formData;

      api
        .post("/admin/register", submitData)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          setIsSubmitting(false);
          toast.success("Registration Successful");
          navigate("/homedash", { state: { user: response.data } });
        })
        .catch((error) => {
          console.error("Registration error:", error);
          setIsSubmitting(false);
          const errorMessage = error.response?.data?.error || error.response?.data?.message || "Registration failed. Please try again.";
          setFormValidMessage(errorMessage);
          toast.error(errorMessage);
        });
    },
    [formData, setUser, navigate]
  );

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Admin Registration</h2>
        <form onSubmit={registerAdmin}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>

          {formValidMessage && (
            <div className="error-message">{formValidMessage}</div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="form-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminReg;
