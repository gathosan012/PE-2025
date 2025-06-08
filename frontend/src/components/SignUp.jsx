import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styling/components/signup.scss";
function SignUp() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const formData = {
    fullname,
    username,
    email,
    password,
    phone_number,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending data:", formData);
    axios
      .post("http://localhost:5000/api/users/register", formData)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          console.log("Registration successful");
          alert("Registration successful");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("Registration failed");
      });
    console.log("setStatus type:", typeof setStatus);
  };
  const handleRedirectToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="auth-container">
      <div className="background-container" />
      <div className="logo-fixed" onClick={() => navigate("/")}>
        🏢 DOMIS
      </div>
      <div className="signup-container">
        <form className="signup-inner" onSubmit={handleSubmit}>
          <span className="title">Register</span>
          <div className="fields-container">
            <input
              type="text"
              name="fullname"
              placeholder="Your fullname"
              required
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Telephone number"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="divider"></div>
          <div className="submit-container">
            <button
              type="submit"
              className="submit-button"
              onClick={handleRedirectToLogin}
            >
              Register
            </button>
            <span className="redirect-link" onClick={handleRedirectToLogin}>
              Already have an account?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
