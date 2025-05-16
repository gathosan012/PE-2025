import React from "react";
import SidePanel from "../components/SidePanel";
import "../styling/components/MainLayout.scss";

const MainLayout = ({ title, children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content-wrapper">
        <h1 className="main-title">{title}</h1>
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
