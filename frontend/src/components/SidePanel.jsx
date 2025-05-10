import React from "react";
import { Link } from "react-router";
import "../styling/components/sidePanel.scss";
import { IoHome } from "react-icons/io5";
import { RiCustomerServiceFill } from "react-icons/ri";
import { MdOutlineBedroomChild } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { MdElectricBolt } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoIosWater } from "react-icons/io";
import useCustomNavigate from "../utils/navigate";

function SidePanel({ selected }) {
  const navigate = useCustomNavigate()

  const handleLogout = () => {
    navigate('/auth')
  }

  return (
    <div className="side-panel-container">
      <div className="top-container">
        <h1>QUẢN LÝ NHÀ TRỌ</h1>
        <h2>Xin chao, user</h2>
      </div>
      <nav className="bottom-container">
        <Link
          to="/"
          className={selected == "home" ? "link active" : "link"}
        >
          <IoHome className="icon"></IoHome>Trang chủ
        </Link>
        <Link
          to="/rooms"
          className={selected == "room" ? "link active" : "link"}
        >
          <MdOutlineBedroomChild className="icon"></MdOutlineBedroomChild>Phòng
        </Link>
        <Link to="/service" className={selected == "service" ? "link active" : "link"}>
          <RiCustomerServiceFill className="icon"></RiCustomerServiceFill>Dịch
          vụ
        </Link>
        <Link to="/electric" className={selected == "electric" ? "link active" : "link"}>
          <MdElectricBolt className="icon"></MdElectricBolt>Chỉ số điện
        </Link>
        <Link to="/water" className={selected == "water" ? "link active" : "link"}>
          <IoIosWater className="icon"></IoIosWater>Chỉ số nước
        </Link>
      </nav>
      <div className="setting-container">
        <div className="profile-wrapper tab">
          <IoPersonCircleSharp className="icon"></IoPersonCircleSharp>
        </div>
        <div className="logout-wrapper tab" onClick={handleLogout}>
          <IoLogOut className="icon"></IoLogOut>
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
