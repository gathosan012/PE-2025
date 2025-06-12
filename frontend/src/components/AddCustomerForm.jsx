import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styling/components/AddCustomerForm.scss";
import SidePanel from "../components/SidePanel";
import axios from "axios";

const AddCustomerForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("information");

  const [formData, setFormData] = useState({
    fullname: "",
    birthday: "",
    CIDNumber: "",
    sex: "",
    phone1: "",
    phone2: "",
    email: "",
    birthPlace: "",
    CIDIssuedDate: "",
    CIDIssuedPlace: "",
    province: "",
    vehicleNumber: "",
    permanentAddress: "",
    note: "",
  });

  const handleBack = () => {
    navigate("/rooms");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://pe-2025.onrender.com/api/tenant",
        formData
      );
      if (response.data.success) {
        navigate("/rooms");
      } else {
        alert("Save failed: " + response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("Unknown error occurred.");
      }
    }
  };

  return (
    <div className="page-layout">
      <SidePanel />
      <div className="page-content">
        <div className="page-wrapper">
          <h2 className="page-title">New Tenant</h2>

          {/* Tabs */}
          <div className="customer-tabs">
            {renderTab("information", "Information of tenant")}
            {renderTab("service", "Service")}
            {renderTab("member", "Member")}
            {renderTab("contract", "Contract")}
          </div>

          {/* Form content */}
          <div className="c-form-tab">
            {activeTab === "information" && (
              <form className="c-form-container">
                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="c-form-group">
                    <label>Birthday *</label>
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Birthplace</label>
                    <input
                      type="text"
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="c-form-group inline-radio">
                    <label>Sex</label>
                    <label>
                      <input
                        type="radio"
                        name="sex"
                        value="Male"
                        checked={formData.sex === "Male"}
                        onChange={handleChange}
                      />{" "}
                      Nam
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="sex"
                        value="Female"
                        checked={formData.sex === "Female"}
                        onChange={handleChange}
                      />{" "}
                      Nữ
                    </label>
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>CID Number *</label>
                    <input
                      type="text"
                      name="CIDNumber"
                      value={formData.CIDNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="c-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Date of issue</label>
                    <input
                      type="date"
                      name="CIDIssuedDate"
                      value={formData.CIDIssuedDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="c-form-group">
                    <label>Phone number 1 *</label>
                    <input
                      type="text"
                      name="phone1"
                      value={formData.phone1}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Place of issue</label>
                    <input
                      type="text"
                      name="CIDIssuedPlace"
                      value={formData.CIDIssuedPlace}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="c-form-group">
                    <label>Phone number 2</label>
                    <input
                      type="text"
                      name="phone2"
                      value={formData.phone2}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>City/Province</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                    >
                      <option value="">-- Select --</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    </select>
                  </div>

                  <div className="c-form-group">
                    <label>Permanent address</label>
                    <input
                      type="text"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Vehicle number</label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      value={formData.vehicleNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="c-form-row">
                  <div
                    className="c-form-group"
                    style={{ gridColumn: "span 2" }}
                  >
                    <label>Note</label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="c-form-actions">
                  <button
                    type="button"
                    onClick={handleBack}
                    style={{ backgroundColor: "#f0ad4e", marginRight: "10px" }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    style={{ backgroundColor: "#5cb85c" }}
                  >
                    Save
                  </button>
                </div>
              </form>
            )}

            {activeTab !== "information" && (
              <p>[{activeTab}] Đang phát triển...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function renderTab(id, label) {
    return (
      <button
        className={`customer-tab ${activeTab === id ? "active" : ""}`}
        onClick={() => setActiveTab(id)}
      >
        {label}
      </button>
    );
  }
};

export default AddCustomerForm;
