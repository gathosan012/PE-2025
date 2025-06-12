import React, { useState } from "react";
import "../styling/components/AddRoomForm.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRoomForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    price: "",
    length: "",
    width: "",
    maxPeople: "",
    area: "",
    numberBedroom: "",
    address: "",
    allowMale: true,
    allowFemale: true,
    description: "",
  });
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [roomStatus, setRoomStatus] = useState("");
  const [feeStatus, setFeeStatus] = useState("");

  const [roomSearch, setRoomSearch] = useState("");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append data to form
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    if (image) form.append("image", image); //add image file

    try {
      const token = localStorage.getItem("authToken");
      console.log("Token from localStorage:", token);
      console.log("Token sent:", token); // Kiểm tra token

      if (!token) {
        alert("You are not logged in or token missing!");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/rooms", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✔  Add room successfully", res.data);
      onSuccess?.();
    } catch (err) {
      console.error(
        "❌ Error when submit form:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="edit-room-wrapper">
      <div className="edit-room-header">
        <h2 className="edit-room-title">Add Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="edit-room-container">
            <div style={{ flex: "1 1 45%" }}>
              <div className="form-group">
                <label>Room number *</label>
                <input
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Area *</label>
                <input
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Length *</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    required
                  />
                  <span style={{ marginLeft: "8px" }}>M</span>
                </div>
              </div>
              <div className="form-group">
                <label>Maximum of people *</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    name="maxPeople"
                    value={formData.maxPeople}
                    onChange={handleChange}
                    required
                  />
                  <span style={{ marginLeft: "8px" }}>People</span>
                </div>
              </div>
            </div>
            <div style={{ flex: "1 1 45%" }}>
              <div className="form-group">
                <label>Price *</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                  <span style={{ marginLeft: "8px" }}>VND</span>
                </div>
              </div>
              <div className="form-group">
                <label>Width *</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                    required
                  />
                  <span style={{ marginLeft: "8px" }}>M</span>
                </div>
              </div>
              <div className="form-group">
                <label>Gender allowed </label>
                <div
                  style={{ display: "flex", gap: "24px", marginTop: "16px" }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="allowMale"
                      checked={formData.allowMale}
                      onChange={handleChange}
                    />
                    Male
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="allowFemale"
                      checked={formData.allowFemale}
                      onChange={handleChange}
                    />
                    Female
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Number of bedroom *</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    name="numberBedroom"
                    value={formData.numberBedroom}
                    onChange={handleChange}
                    required
                  />
                  <span style={{ marginLeft: "8px" }}>Room</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="edit-room-container"
            style={{ flexDirection: "column" }}
          >
            <div className="form-group">
              <label>Address </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={1}
              />
            </div>
            <div className="form-group">
              <label>Description </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Image </label>
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              className="btn"
              onClick={() => {
                onSuccess();
              }}
              style={{ backgroundColor: "#f0ad4e", marginRight: "10px" }}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#5cb85c" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomForm;
