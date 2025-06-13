import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styling/components/AddCustomerForm.scss";
import SidePanel from "../components/SidePanel";
import axios from "axios";

const AddCustomerForm = () => {
  const { roomId, contractId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("information");
  const [tenantId, setTenantId] = useState(null);
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

  const handleChangeTenant = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveTenant = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You need to log in first.");
      }

      const response = await axios.post(
<<<<<<< HEAD
        "https://pe-2025.onrender.com/api/tenant",
        formData
=======
        "http://localhost:5000/api/tenant/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
>>>>>>> new-origin/integration
      );
      if (response.data.success) {
        alert("Tenant added successfully!");
        //navigate("/rooms");
        setTenantId(response.data.tenant._id);
        setActiveTab("contract");
      } else {
        alert("Save failed: " + response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error from server:", error.response.data);
        alert("Error: " + JSON.stringify(error.response.data));
      } else {
        alert("Unknown error occurred.");
      }
    }
  };
  const [contractData, setContractData] = useState({
    startDate: "",
    endDate: "",
    monthlyFee: "",
    deposit: "",
    payPer: "1",
  });
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) return;

      try {
        if (contractId) {
          // Fetch contract (Từ tenantId fetch được tenant Information)
          const res = await axios.get(
            `http://localhost:5000/api/contracts/${contractId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const contract = res.data;

          // Gán dữ liệu hợp đồng
          setContractData({
            startDate: contract.startDate?.split("T")[0],
            endDate: contract.endDate?.split("T")[0],
            monthlyFee: contract.monthlyFee,
            deposit: contract.deposit,
            payPer: contract.payPer,
          });

          // Gán dữ liệu tenant
          if (contract.tenantId) {
            const t = contract.tenantId;
            setFormData({
              fullname: t.fullname || "",
              birthday: t.birthday?.split("T")[0] || "",
              CIDNumber: t.CIDNumber || "",
              sex: t.sex || "",
              phone1: t.phone1 || "",
              phone2: t.phone2 || "",
              email: t.email || "",
              birthPlace: t.birthPlace || "",
              CIDIssuedDate: t.CIDIssuedDate?.split("T")[0] || "",
              CIDIssuedPlace: t.CIDIssuedPlace || "",
              province: t.province || "",
              vehicleNumber: t.vehicleNumber || "",
              permanentAddress: t.permanentAddress || "",
              note: t.note || "",
            });
          }
        } else {
          //get price of room
          const res = await axios.get(
            `http://localhost:5000/api/rooms/${roomId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.price) {
            setContractData((prev) => ({
              ...prev,
              monthlyFee: res.data.price,
            }));
          }
        }
      } catch (err) {
        console.error("❌ Error loading data:", err);
      }
    };

    if (roomId) {
      fetchData();
    }
  }, [roomId, contractId]);

  const handleChangeContract = (e) => {
    const { name, value } = e.target;
    setContractData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSaveContract = async () => {
    if (!tenantId) {
      alert("Tenant ID missing. Please save tenant first.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const contractPayload = {
        roomId,
        tenantId,
        ...contractData,
        status: "active",
      };

      const response = await axios.post(
        "http://localhost:5000/api/contracts/add",
        contractPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Contract saved successfully!");
        navigate("/rooms");
      } else {
        alert("Failed to save contract.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving contract.");
    }
  };

  const handleEndContract = async () => {
    if (!contractId) return;

    const confirm = window.confirm("Do you want to end this contract?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        `http://localhost:5000/api/contracts/${contractId}`,
        { status: "terminated" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.contract.status === "terminated") {
        alert("This contract has been terminated.");
        navigate("/rooms");
      }
    } catch (err) {
      console.error("❌ Error ending contract:", err);
      alert("Error ending contract.");
    }
  };
  const handleUpdateTenant = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token || !contractId) return;

      // lấy tenantId từ contract trước
      const res = await axios.get(
        `http://localhost:5000/api/contracts/${contractId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const tenantId = res.data.tenantId?._id;
      if (!tenantId) {
        alert("Tenant ID not found in contract.");
        return;
      }

      const updateRes = await axios.put(
        `http://localhost:5000/api/tenant/${tenantId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (updateRes.status === 200) {
        alert("Tenant information updated successfully.");
      }
    } catch (err) {
      console.error("❌ Error updating tenant:", err);
      alert("Failed to update tenant.");
    }
  };
  return (
    <div className="page-layout">
      <SidePanel />
      <div className="page-content">
        <div className="page-wrapper">
          <h2 className="page-title">
            {contractId ? "View/Edit Tenant" : "New Tenant"}
          </h2>

          {/* Tabs */}
          <div className="customer-tabs">
            {renderTab("information", "Information of tenant")}
            {renderTab("service", "Service")}
            {renderTab("member", "Member")}
            {renderTab("contract", "Contract")}
          </div>

          {/* Form Information of Tenant */}
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
                      onChange={handleChangeTenant}
                    />
                  </div>

                  <div className="c-form-group">
                    <label>Birthday *</label>
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChangeTenant}
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
                      onChange={handleChangeTenant}
                    />
                  </div>

                  <div className="c-form-group inline-radio">
                    <label>Sex *</label>
                    <label>
                      <input
                        type="radio"
                        name="sex"
                        value="Male"
                        checked={formData.sex === "Male"}
                        onChange={handleChangeTenant}
                      />{" "}
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="sex"
                        value="Female"
                        checked={formData.sex === "Female"}
                        onChange={handleChangeTenant}
                      />{" "}
                      Female
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
                      onChange={handleChangeTenant}
                    />
                  </div>

                  <div className="c-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChangeTenant}
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
                      onChange={handleChangeTenant}
                    />
                  </div>

                  <div className="c-form-group">
                    <label>Phone number 1 *</label>
                    <input
                      type="text"
                      name="phone1"
                      value={formData.phone1}
                      onChange={handleChangeTenant}
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
                      onChange={handleChangeTenant}
                    />
                  </div>

                  <div className="c-form-group">
                    <label>Phone number 2</label>
                    <input
                      type="text"
                      name="phone2"
                      value={formData.phone2}
                      onChange={handleChangeTenant}
                    />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>City/Province</label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleChangeTenant}
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
                      onChange={handleChangeTenant}
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
                      onChange={handleChangeTenant}
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
                      onChange={handleChangeTenant}
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
                  {!contractId ? (
                    <button
                      type="button"
                      onClick={handleSaveTenant}
                      style={{ backgroundColor: "#5cb85c" }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleUpdateTenant}
                      style={{ backgroundColor: "#0275d8" }}
                    >
                      Update
                    </button>
                  )}
                </div>
              </form>
            )}
            {activeTab === "contract" && (
              <form className="c-form-container">
                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={contractData.startDate}
                      onChange={handleChangeContract}
                      readOnly={!!contractId}
                    />
                  </div>

                  <div className="c-form-group">
                    <label>End Date *</label>
                    <input
                      type="date"
                      name="endDate"
                      value={contractData.endDate}
                      onChange={handleChangeContract}
                      readOnly={!!contractId}
                    />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Monthly Fee</label>
                    <input
                      type="number"
                      name="monthlyFee"
                      value={contractData.monthlyFee}
                      readOnly
                    />
                  </div>

                  <div className="c-form-group">
                    <label>Deposit *</label>
                    <input
                      type="number"
                      name="deposit"
                      value={contractData.deposit}
                      onChange={handleChangeContract}
                      readOnly={!!contractId}
                    />
                  </div>
                </div>

                <div className="c-form-row">
                  <div className="c-form-group">
                    <label>Pay per</label>
                    <select
                      name="payPer"
                      value={contractData.payPer}
                      onChange={handleChangeContract}
                      disabled={!!contractId}
                    >
                      <option value="1">1 month</option>
                      <option value="2">2 months</option>
                      <option value="3">3 months</option>
                    </select>
                  </div>
                </div>

                <div className="c-form-actions">
                  {contractId ? (
                    <>
                      <button
                        type="button"
                        onClick={handleBack}
                        style={{
                          backgroundColor: "#f0ad4e",
                          marginRight: "10px",
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleEndContract}
                        style={{ backgroundColor: "#d9534f" }}
                      >
                        End
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSaveContract}
                      style={{ backgroundColor: "#5cb85c" }}
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            )}

            {activeTab === "service" && <p>[Service] Implementing...</p>}
            {activeTab === "member" && <p>[Member] Implementing...</p>}
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
