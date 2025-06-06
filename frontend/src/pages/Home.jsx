import React, { useEffect, useState } from "react";
import "../styling/home.scss";
import SidePanel from "../components/SidePanel";
import Panel from "../components/Panel";
import RoomStatusChart from "../components/RoomStatusChart";
import axios from "axios";
function Home() {
  const [occupied, setOccupied] = useState(0);
  const [available, setAvailable] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get("http://localhost:5000/api/rooms/status-summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOccupied(res.data.occupied);
        setAvailable(res.data.available);
      })
      .catch((err) => {
        console.error("Failed to fetch room status summary", err);
      });
  }, []);
  return (
    <div className="home-container">
      <SidePanel selected="home"></SidePanel>
      <div className="home-content">
        <Panel title="Room status">
          <RoomStatusChart occupied={occupied} available={available} />
        </Panel>
        <Panel title="Unpaid rooms"></Panel>
        <Panel title="Contract deadline"></Panel>
        <Panel title="Incomplete task"></Panel>
      </div>
    </div>
  );
}

export default Home;
