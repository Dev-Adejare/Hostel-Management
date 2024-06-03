import React, { useContext, useEffect, useState } from "react";
import "./Register.css";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../PasswordInput/PasswordInput";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";

const AdminReg = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(UserContext);
  const [formValidMessage, setFormValidMessage] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    Password2: "",
  });

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const navigate = useNavigate();

  const timesIcon = <FaTimes color="red" size={20} />;
  const checkIcon = <BsCheck2All color="green" size={20} />;

  const switchIcon = (condition) => {
    return condition ? checkIcon : timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { password } = formData;

    setUCase(/([a-z].[A-Z])|([A-Z].[a-z])/.test(password));
    setNum(/[0-9]/.test(password));
    setSChar(/[!,%,&,@,#,$,^,*,?,_,~]/.test(password));
    setPassLength(password.length > 5);
  }, [formData.password]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const { fullname, email, password, Password2 } = formData;

      if (!fullname || !email || !password || !Password2) {
        setFormValidMessage("oop!! All fields are required 😏");
        return;
      }

      if (password !== Password2) {
        setFormValidMessage("Passwords do not match");
        return;
      }

      setIsSubmitting(true);

      axios
        .post("http:localhost:3500/admin/register", formData)
        .then((response) => {
          setUser(response.data);
          setIsSubmitting(false);
          setFormCompleted(true);
          toast.success("Registration successful");
          navigate("/homedash", { state: { user: response.data } });
        })
        .catch((error) => {
          setIsSubmitting(false);
          const message =
            error.response?.status === 400
              ? "A user with the same email already exists."
              : "Server error, unable to register user.";
          setFormValidMessage(message);
        });
    },
    [formData, navigate, setUser]
  );

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
            <form className="form" onSubmit={handleSubmit}>
              <div className="--dir-column">
                <label htmlFor="fullname">Full name:</label>
                <input
                  type="text"
                  className="input"
                  name="fullname"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="password">Password:</label>
                <PasswordInput
                  placeholder="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="--dir-column">
                <label htmlFor="password2">Confirm password:</label>
                <PasswordInput
                  placeholder="password"
                  name="password2"
                  value={formData.Password2}
                  onChange={handleInputChange}
                  onPaste={(e) => {
                    e.preventDefault();
                    toast.error("Cannot paste into input field")
                  }

                  }
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
