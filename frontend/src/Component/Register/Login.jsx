import React, { useState, useCallback, useContext } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordInput from "../PasswordInput/PasswordInput";
import { UserContext } from "../../../context/userContext";
import api from "../../config/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
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

  const loginUser = useCallback(
    (event) => {
      event.preventDefault();

      const { email, password } = formData;

      if (!email || !password) {
        setFormValidMessage("Oops! all fields are required");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setFormValidMessage("Please enter a valid email address");
        return;
      }

      setIsSubmitting(true);

      api
        .post("/admin/login", formData)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
          setIsSubmitting(false);
          toast.success("Login Successful");
          navigate("/homedash", { state: { user: response.data } });
        })
        .catch((error) => {
          console.error("Login error:", error);
          setIsSubmitting(false);
          const errorMessage = error.response?.data?.error || error.response?.data?.message || "Login failed. Please try again.";
          setFormValidMessage(errorMessage);
          toast.error(errorMessage);
        });
    },
    [formData, setUser, navigate]
  );

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Login</h2>
        <form onSubmit={loginUser}>
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

          {formValidMessage && (
            <div className="error-message">{formValidMessage}</div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="form-footer">
          <p>
            Don't have an account? <Link to="/">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
