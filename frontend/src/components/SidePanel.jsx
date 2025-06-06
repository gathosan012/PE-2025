import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import "../styling/components/sidePanel.scss";
import {
  IoSpeedometer,
  IoHome,
  IoCube,
  IoFlash,
  IoWater,
  IoHammer,
  IoCalculator,
  IoCash,
  IoRepeat,
  IoBriefcase,
  IoPerson,
  IoLogOut,
} from "react-icons/io5";

/*const [username, setUsername] = useState("");
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/userInfo");
      setUsername(res.data.username);
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
  };

  fetchUser();
}, []);
*/
function SidePanel({ selected }) {
  return (
    <div className="side-panel-container">
      <div className="top-container">
        <h1>APARTMENT MANAGEMENT</h1>
        <h2>Hello, user</h2>
      </div>
      <nav className="bottom-container">
        <Link
          to="/dashboard"
          className={selected == "dashboard" ? "link active" : "link"}
        >
          <IoSpeedometer className="icon"></IoSpeedometer>Dashboard
        </Link>
        <Link
          to="/rooms"
          className={selected == "room" ? "link active" : "link"}
        >
          <IoHome className="icon"></IoHome>Room
        </Link>
        <Link
          to="/service"
          className={selected === "service" ? "link active" : "link"}
        >
          <IoCube className="icon" />
          <span>Service</span>
        </Link>

        <Link
          to="/electric"
          className={selected === "electric" ? "link active" : "link"}
        >
          <IoFlash className="icon" />
          <span>Electric Meter</span>
        </Link>

        <Link
          to="/water"
          className={selected === "water" ? "link active" : "link"}
        >
          <IoWater className="icon" />
          <span>Water Meter</span>
        </Link>

        <Link to="/customer" className="link">
          <IoPerson className="icon"></IoPerson>
          Customer
        </Link>
        <Link
          to="/logout"
          className={selected === "logout" ? "link active" : "link"}
        >
          <IoLogOut className="icon" />
          <span>Log out</span>
        </Link>
      </nav>
    </div>
  );
}

export default SidePanel;
