import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/components/signin.scss";

function SignIn() {
  console.log("Rendering SignIn");
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/users/login", account)
      .then((response) => {
        if (response.status === 200) {
          alert("Login successful");
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert(
          "Login failed: " + (error.response?.data?.message || "Unknown error")
        );
      });
  };
  const handleRedirectToRegister = () => {
    navigate("/register");
  };
  return (
    <div className="auth-container">
      <div className="background-container" />
      <div className="signin-container">
        <form className="signin-inner" onSubmit={handleSubmit}>
          <span className="title">Log in</span>
          <div className="fields-container">
            <input
              type="email"
              name="email"
              value={account.email}
              onChange={handleChange}
              required
              placeholder="Email address*"
            />
            <input
              type="password"
              name="password"
              value={account.password}
              onChange={handleChange}
              required
              placeholder="Password*"
            />
            <div className="remember-container">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                value="remember"
              />
              <label htmlFor="remember">Remember</label>
            </div>
          </div>
          <div className="divider"></div>
          <div className="submit-container">
            <button type="submit" className="submit-button">
              Login
            </button>
            <span className="redirect-link" onClick={handleRedirectToRegister}>
              Create an account
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
