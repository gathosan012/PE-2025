import React from "react";
import "../styling/home.scss";
import SidePanel from "../components/SidePanel";
import Panel from "../components/Panel";

function Home() {
  return (
    <div className="home-container">
      <SidePanel selected="home"></SidePanel>
      <div className="home-content">
        <Panel title="Danh sách phòng trống"></Panel>
        <Panel title="Danh sách khách nợ tiền phòng"></Panel>
        <Panel title="Khách sắp hết hạn hợp đồng"></Panel>
        <Panel title="Công việc chưa hoàn thành"></Panel>
      </div>
    </div>
  );
}

export default Home;
