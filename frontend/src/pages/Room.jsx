import React, { useState, useEffect } from "react";
import "../styling/room.scss";

import SidePanel from "../components/SidePanel";
import MainLayout from "../components/MainLayout";
import AddRoomForm from "../components/AddRoomForm";
import EditRoomForm from "../components/EditRoomForm";
import "../styling/components/AddRoomForm.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  const [originalRooms, setOriginalRooms] = useState([]);

  const [showAddRoom, setShowAddRoom] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const fetchRooms = () => {
    const token = localStorage.getItem("authToken");
    // Kiểm tra nếu token không tồn tại
    if (!token) {
      console.error("No token found in localStorage");
      // Có thể redirect về trang login ở đây
      return;
    }

    console.log("Token frontend:", token); // Debug token
    axios
      .get("http://localhost:5000/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        setRooms(res.data);
        setOriginalRooms(res.data);
      })
      .catch((err) => {
        console.error("Error when fetch room!", err);
        alert(" Could not fetch room data!");
      });
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "landlord") {
      alert("Access denied. Only landlord can access this page.");
      navigate("/"); // hoặc điều hướng tới trang phù hợp
    } else {
      fetchRooms(); // Chỉ fetch khi role hợp lệ
    }
  }, []);

  const handleRoomStatusChange = (e) => {
    setRoomStatus(e.target.value);
  };

  const handleFeeStatusChange = (e) => {
    setFeeStatus(e.target.value);
  };

  const filterRooms = () => {
    const filtered = originalRooms.filter((room) => {
      //const matchRoomStatus = !roomStatus || room.status === roomStatus;
      //const matchFeeStatus = !feeStatus || room.feeStatus === feeStatus;
      const matchRoomSearch =
        !roomSearch || room.roomNumber?.toString().includes(roomSearch);
      const matchArea = area === "" || Number(room.area) === Number(area);
      const matchBedroom =
        numberBedroom === "" ||
        Number(room.numberBedroom) === Number(numberBedroom);
      const matchAddress =
        !address || room.address?.toLowerCase().includes(address.toLowerCase());

      return (
        //matchRoomStatus &&
        //matchFeeStatus &&
        matchRoomSearch && matchArea && matchBedroom && matchAddress
      );
    });

    setRooms(filtered);
  };

  const handleSearchClick = () => {
    filterRooms();
  };

  const handleCustomersClick = () => {
    // Chức năng quản lý khách hàng (có thể điều hướng đến trang khách hàng)
    console.log("Quản lý khách hàng");
  };

  const handleEditRoom = (roomId) => {
    const room = rooms.find((r) => r._id === roomId);
    setEditingRoom(room);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${roomId}`);

      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));

      alert("Delete room successfully!");
    } catch (error) {
      console.error("Lỗi xóa phòng:", error);
      alert("There was an error deleting the room.");
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
          <h2 className="room-title">Room Management</h2>
          <div className="roompage-actions">
            <select
              className="dropdown"
              value={roomStatus}
              onChange={handleRoomStatusChange}
              aria-label="Room status"
            >
              <option value="">Room status</option>
              <option value="Trống">Available</option>
              <option value="Đang thuê">Rented</option>
            </select>
            <select
              className="dropdown"
              value={feeStatus}
              onChange={handleFeeStatusChange}
              aria-label="Trạng thái phí"
            >
              <option value="">Payment status</option>
              <option value="Đã thanh toán">Paid</option>
              <option value="Chưa thanh toán">Unpaid</option>
            </select>
            <input
              type="number"
              className="search-input-bedroom"
              placeholder="Number of bedrooms"
              value={numberBedroom}
              onChange={(e) => setNumberBedroom(e.target.value)}
              aria-label="Số phòng ngủ"
            />{" "}
            <input
              type="number"
              className="search-input"
              placeholder="Area (m²)"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              aria-label="Diện tích"
            />
            <input
              type="text"
              className="search-input"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-label="Địa chỉ"
            />
            <button className="btn search-btn" onClick={handleSearchClick}>
              🔍 Search
            </button>
            <button
              className="btn add-btn"
              onClick={() => setShowAddRoom(true)}
            >
              New Room
            </button>
            <button
              className="btn customers-btn"
              onClick={handleCustomersClick}
            >
              Customer
            </button>
          </div>
          <div className="room-container">
            {rooms.map((room) => (
              <div
                key={room._id}
                className={`room-card ${room.rented ? "rented" : ""}`}
              >
                <div className="room-image">
                  {room.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${room.image}`}
                      alt={`Room ${room.roomNumber}`}
                    />
                  ) : (
                    <p>null</p>
                  )}
                </div>
                <div className="room-number"> 🏠Room {room.roomNumber}</div>

                {room.rented ? (
                  <div className="tenant">👤 {room.tenant}</div>
                ) : (
                  <button
                    className="btn add-tenant"
                    onClick={() => handleAddTenant(room._id)}
                  >
                    ➕ Add Tenant
                  </button>
                )}
                <div className="room-details">
                  <div className="area">◼️ {room.area} m²</div>
                  <div className="num-bedrooms">🛏️ {room.numberBedroom}</div>
                </div>
                <div className="price">
                  🏷️{room.price.toLocaleString()} vnđ/month
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
                    ✏️ Edit
                  </button>

                  <button
                    className="btn delete-btn"
                    onClick={() => handleDeleteRoom(room._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {showAddRoom && (
            <div className="modal-overlay">
              <div className="modal-content">
                <AddRoomForm
                  onSuccess={() => {
                    setShowAddRoom(false); // Đóng popup
                    fetchRooms(); // Reload lại danh sách
                  }}
                />
              </div>
            </div>
          )}
          {editingRoom && (
            <div className="modal-overlay">
              <div className="modal-content">
                <EditRoomForm
                  roomData={editingRoom}
                  onSuccess={() => {
                    setEditingRoom(null);
                    fetchRooms();
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
