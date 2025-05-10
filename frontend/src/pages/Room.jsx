import React, { useState, useEffect } from "react";
import "../styling/room.scss";

import SidePanel from "../components/SidePanel";

import { useNavigate } from "react-router-dom";
import axios from "axios";

/*const initialRooms = [
  {
    id: 1,
    roomNumber: "A101",
    price: 15000000,
    rented: false,
    area: 234,
    address: "46 Lê Quý Đôn, Cầu Giấy, Hà Nội",
    numBedrooms: 2,
    imageUrl:
      "https://klux.com.vn/wp-content/uploads/2023/12/thiet-ke-chung-cu-2-phong-ngu-5.jpg",
  },
  {
    id: 2,
    roomNumber: "A102",
    price: 25000000,
    rented: true,
    tenant: "haf",
    area: 234,
    address: "108 Lý Thường Kiệt, Thành phố Huế",
    numBedrooms: 3,
    imageUrl:
      "https://vinhomecentralpark.com.vn/wp-content/uploads/2022/10/Phong-khach-can-ho-Landmark-3-Vinhomes-Tan-Cang.jpg",
  },
  {
    id: 3,
    roomNumber: "A103",
    price: 9000000,
    rented: false,
    area: 234,
    address: "103 Trần Quốc Toản, Đống Đa, Hà Nội",
    numBedrooms: 1,
    imageUrl:
      "https://everon.com/upload/upload-images/thiet-ke-can-ho-1-phong-ngu-17.jpg",
  },
  {
    id: 4,
    roomNumber: "A104",
    price: 1400000,
    rented: false,
    area: 234,
    address: "90 D5, Quận Bình Thạnh, Tp.Hồ Chí Minh",
    numBedrooms: 2,
    imageUrl:
      "https://media.vneconomy.vn/w800/images/upload/2021/04/20/a1-1606267205268147052067-crop-16062672089211225810064.jpg",
  },
  {
    id: 5,
    roomNumber: "A105",
    price: 32000000,
    rented: false,
    area: 234,
    address: "60 Trần Chân, Quận 3, Tp.Hồ Chí Minh",
    numBedrooms: 4,
    imageUrl:
      "https://noithatmanhhe.vn/wp-content/uploads/2024/03/15-khong-gian-phong-khach-dep-1.jpg",
  },
];*/

const Room = () => {
  const [roomStatus, setRoomStatus] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [feeStatus, setFeeStatus] = useState("");
  const [roomSearch, setRoomSearch] = useState("");
  const [roomId, setRoomId] = useState("");
  const [price, setPrice] = useState("");
  const [tenant, setTenant] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [numberBedroom, setNumberBedroom] = useState("");
  const [image, setImage] = useState("");

  //const [rooms, setRooms] = useState(initialRooms);

  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Lỗi khi fetch phòng:", err));
  }, []);

  const handleRoomStatusChange = (e) => {
    setRoomStatus(e.target.value);
  };

  const handleFeeStatusChange = (e) => {
    setFeeStatus(e.target.value);
  };

  const handleRoomSearchChange = (e) => {
    setRoomSearch(e.target.value);
  };

  const handleSearchClick = () => {
    // Xử lý tìm kiếm hoặc lọc kết quả ở đây
    console.log("Tìm kiếm:", { roomStatus, feeStatus, roomSearch });
  };

  const handleCustomersClick = () => {
    // Chức năng quản lý khách hàng (có thể điều hướng đến trang khách hàng)
    console.log("Quản lý khách hàng");
  };

  const handleEditRoom = (roomId) => {
    navigate(`/rooms/edit/${roomId}`);
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phòng này không?")) {
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
    }
  };

  const handleAddTenant = (roomId) => {
    navigate(`/add-customer/${roomId}`);
  };
  return (
    <div className="room-layout">
      <SidePanel selected="room" />
      <div className="room-content">
        <div className="room-wrapper">
          <h2 className="room-title">Danh sách phòng</h2>
          <div className="roompage-actions">
            <select
              className="dropdown"
              value={roomStatus}
              onChange={handleRoomStatusChange}
              aria-label="Trạng thái phòng"
            >
              <option value="">- Trạng thái phòng -</option>
              <option value="Trống">Trống</option>
              <option value="Đang thuê">Đang thuê</option>
              <option value="Đang dọn">Đang dọn</option>
            </select>
            <select
              className="dropdown"
              value={feeStatus}
              onChange={handleFeeStatusChange}
              aria-label="Trạng thái phí"
            >
              <option value="">- Trạng thái phí -</option>
              <option value="Đã thanh toán">Đã thanh toán</option>
              <option value="Chưa thanh toán">Chưa thanh toán</option>
            </select>
            <input
              type="text"
              className="search-input"
              placeholder="Phòng"
              value={roomSearch}
              onChange={handleRoomSearchChange}
              aria-label="Tìm kiếm phòng"
            />
            <input
              type="number"
              className="search-input"
              placeholder="Số phòng ngủ"
              value={numberBedroom}
              onChange={(e) => setNumberBedroom(e.target.value)}
              aria-label="Số phòng ngủ"
            />{" "}
            {/* Thêm trường nhập số phòng ngủ */}
            <input
              type="number"
              className="search-input"
              placeholder="Diện tích"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              aria-label="Diện tích"
            />
            <input
              type="text"
              className="search-input"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-label="Địa chỉ"
            />
            <button className="btn search-btn" onClick={handleSearchClick}>
              🔍 Tìm kiếm
            </button>
            <button
              className="btn add-btn"
              onClick={() => navigate("/rooms/add")}
            >
              Thêm phòng
            </button>
            <button
              className="btn customers-btn"
              onClick={handleCustomersClick}
            >
              Khách hàng
            </button>
          </div>
          <div className="room-container">
            {rooms.map((room) => (
              <div
                key={room._id}
                className={`room-card ${room.rented ? "rented" : ""}`}
              >
                {/* Hiển thị hình ảnh */}
                <div className="room-image">
                  {room.imageUrl ? (
                    <img
                      src={room.image || room.imageUrl}
                      alt={`Room ${room.roomNumber}`}
                    />
                  ) : (
                    <p>Chưa có hình ảnh</p>
                  )}
                </div>
                <div className="room-number"> 🏠Phòng {room.roomNumber}</div>

                {room.rented ? (
                  <div className="tenant">👤 {room.tenant}</div>
                ) : (
                  <button
                    className="btn add-tenant"
                    onClick={() => handleAddTenant(room._id)}
                  >
                    ➕Thêm khách
                  </button>
                )}
                <div className="room-details">
                  <div className="area">◼️ {room.area} m²</div>
                  <div className="num-bedrooms">🛏️ {room.numberBedroom}</div>
                </div>
                <div className="price">
                  🏷️{room.price.toLocaleString()} VNĐ/Tháng
                </div>
                <div className="address">
                  {" "}
                  📍{room.address.toLocaleString()}
                </div>
                <div className="room-actions">
                  <button
                    className="btn edit-btn"
                    onClick={() => handleEditRoom(room._id)}
                  >
                    ✏️ Chỉnh sửa
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    🗑️ Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
