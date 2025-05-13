import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styling/components/AddCustomerForm.scss";
import SidePanel from "../components/SidePanel";
import axios from "axios";

const AddCustomerForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("information");

  const handleBack = () => {
    navigate("/rooms");
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('api', room, )
      if (response.data.success) {
        navigate("/rooms");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
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
                    <label>Room</label>
                    {/*change roomID*/}
                    <input type="text" name="room" defaultValue="1" />
                  </div>
                  <div className="c-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Birthday *</label>
                    <input type="date" name="dob" />
                  </div>
                  <div className="c-form-group">
                    <label>Birthplace</label>
                    <input type="text" name="placeOfBirth" />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group inline-radio">
                    <label>Sex</label>
                    <input type="radio" name="gender" value="Male" /> Nam
                    <input type="radio" name="gender" value="Female" /> Nữ
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>CID Number *</label>
                    <input type="text" name="idNumber" />
                  </div>
                  <div className="c-form-group">
                    <label>Email *</label>
                    <input type="text" name="email" />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Date of issue</label>
                    <input type="date" name="issuedDate" />
                  </div>
                  <div className="c-form-group">
                    <label>Phone number 1 *</label>
                    <input type="text" name="phone1" />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Place of issue</label>
                    <input type="text" name="issuedPlace" />
                  </div>

                  <div className="c-form-group">
                    <label>Phone number 2</label>
                    <input type="text" name="phone2" />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>City/Province</label>
                    <select name="province">
                      <option value="">-- Select --</option>
                      <option value="hanoi">Hà Nội</option>
                      <option value="hcm">Hồ Chí Minh</option>
                    </select>
                  </div>

                  <div className="c-form-group">
                    <label>Permanent address</label>
                    <input type="text" name="permanentAddress" />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group currency">
                    <label>Room fee*</label>
                    <input type="text" name="roomPrice" />
                    <span>VNĐ</span>
                  </div>
                  <div className="c-form-group currency">
                    <label>Deposit *</label>
                    <input type="text" name="deposit" defaultValue="0" />
                    <span>VNĐ</span>
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Start day*</label>
                    <input
                      type="date"
                      name="startDate"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="c-form-group">
                    <label>Payment Period *</label>
                    <select name="paymentPeriod">
                      <option value="30">Kỳ 30</option>
                      <option value="15">Kỳ 15</option>
                    </select>
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Pay per</label>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <select name="paymentEachTime">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <span>Month</span>
                    </div>
                  </div>
                  <div className="c-form-group">
                    <label>Vehicle number</label>
                    <input type="text" name="vehicle" />
                  </div>
                </div>

                <div className="c-form-row">
                  <div
                    className="c-form-group"
                    style={{ gridColumn: "span 2" }}
                  >
                    <label>Note</label>
                    <textarea name="notes"></textarea>
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
