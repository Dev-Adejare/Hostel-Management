import React, { useState, useCallback, useContext } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../PasswordInput/PasswordInput";
import { UserContext } from "../../../context/userContext";
import api from "../../config/api";

const StudentReg = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    nationality: "",
    g_name: "",
    g_email: "",
    gender: "",
    roomNum: "",
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
    const { name, email, age, nationality, g_name, g_email, gender, roomNum } = formData;

    if (!name || !email || !age || !nationality || !g_name || !g_email || !gender || !roomNum) {
      setFormValidMessage("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormValidMessage("Please enter a valid email address");
      return false;
    }

    if (!emailRegex.test(g_email)) {
      setFormValidMessage("Please enter a valid guardian email address");
      return false;
    }

    if (isNaN(age) || age < 16 || age > 100) {
      setFormValidMessage("Age must be between 16 and 100");
      return false;
    }

    if (isNaN(roomNum) || roomNum < 1) {
      setFormValidMessage("Please enter a valid room number");
      return false;
    }

    return true;
  };

  const registerStudent = useCallback(
    (event) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);

      api
        .post("/students/registerStudent", formData)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          setIsSubmitting(false);
          toast.success("Registration Successful");
          navigate("/studentdash", { state: { user: response.data } });
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
        <h2>Student Registration</h2>
        <form onSubmit={registerStudent}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
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
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              min="16"
              max="100"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="g_name">Guardian Name</label>
            <input
              type="text"
              id="g_name"
              name="g_name"
              value={formData.g_name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="g_email">Guardian Email</label>
            <input
              type="email"
              id="g_email"
              name="g_email"
              value={formData.g_email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="roomNum">Room Number</label>
            <input
              type="number"
              id="roomNum"
              name="roomNum"
              value={formData.roomNum}
              onChange={handleInputChange}
              min="1"
              required
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

export default StudentReg;
