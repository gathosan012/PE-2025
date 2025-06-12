import React from "react";
import "../styling/home.scss";
import SidePanel from "../components/SidePanel";
import Panel from "../components/Panel";

function Home() {
  return (
    <div className="home-container">
      <SidePanel selected="home"></SidePanel>
      <div className="home-content">
        <Panel title="Available rooms"></Panel>
        <Panel title="Unpaid rooms"></Panel>
        <Panel title="Contract deadline"></Panel>
        <Panel title="Incomplete task"></Panel>
      </div>
    </div>
  );
}

export default Home;
