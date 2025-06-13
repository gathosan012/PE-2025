import React from "react";
import { useNavigate } from "react-router";
import "../styling/welcome.scss";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-wrapper">
      {/* HEADER */}
      <header className="welcome-header">
        <div className="logo">🏢 DOMIS</div>
        <div className="auth-buttons">
          <button className="login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="signup" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="welcome-content">
        <h1>Apartment Management</h1>
        <p>
          Helping you manage rooms, contracts, and utilities <br />
          in a clean, organized, and professional way.
        </p>
        <div className="action-buttons">
          <button className="try-btn">Explore Now</button>
          <button className="pricing-btn">Learn More</button>
        </div>
      </main>
    </div>
  );
}
