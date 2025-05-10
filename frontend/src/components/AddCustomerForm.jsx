import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styling/components/AddCustomerForm.scss";
import axios from "axios";

const AddCustomerForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("thongtin");

  const handleBack = () => navigate("/room");
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('api', room, )
      if (response.data.success) {
        navigate("/room");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="add-customer-form">
      {/* Header */}
      <h2>➕ Thêm khách thuê phòng</h2>

      {/* Tabs */}
      <div className="customer-tabs">
        {renderTab("thongtin", "Thông tin khách thuê")}
        {renderTab("dichvu", "Dịch vụ")}
        {renderTab("thanhvien", "Thành viên")}
        {renderTab("hopdong", "Hợp đồng")}
      </div>

      {/* Form content */}
      <div className="c-form-tab">
        {activeTab === "thongtin" && (
          <form className="c-form-container">
            {/* Dòng 1 */}
            <div className="c-form-row">
              <div className="c-form-group">
                <label>Phòng thuê</label>
                {/*change roomID*/}
                <input type="text" name="room" defaultValue="1" />
              </div>
              <div className="c-form-group">
                <label>Họ và tên *</label>
                <input type="text" name="fullName" placeholder="Nhập họ tên" />
              </div>
            </div>

            {/* Dòng 2 */}
            <div className="c-form-row">
              <div className="c-form-group">
                <label>Ngày sinh</label>
                <input type="date" name="dob" />
              </div>
              <div className="c-form-group">
                <label>Nơi sinh</label>
                <input type="text" name="placeOfBirth" />
              </div>
            </div>

            {/* Dòng 3 */}
            <div className="c-form-row">
              <div className="c-form-group inline-radio">
                <label>Giới tính</label>
                <input type="radio" name="gender" value="Nam" /> Nam
                <input type="radio" name="gender" value="Nữ" /> Nữ
              </div>
            </div>

            {/* Dòng 4 */}
            <div className="c-form-row">
              <div className="c-form-group">
                <label>CMND/CCCD</label>
                <input type="text" name="idNumber" />
              </div>
              <div className="c-form-group">
                <label>Email</label>
                <input type="text" name="email" />
              </div>
            </div>

            {/* Dòng 5 */}
            <div className="c-form-row">
              <div className="c-form-group">
                <label>Ngày cấp</label>
                <input type="date" name="issuedDate" />
              </div>
              <div className="c-form-group">
                <label>Điện thoại 1</label>
                <input type="text" name="phone1" />
              </div>
            </div>

            {/* Dòng 6 */}
            <div className="c-form-row">
              <div className="c-form-group">
                <label>Nơi cấp</label>
                <input type="text" name="issuedPlace" />
              </div>

              <div className="c-form-group">
                <label>Điện thoại 2</label>
                <input type="text" name="phone2" />
              </div>
            </div>

            {/* Dòng 7 */}
            <div className="c-form-row">
              <div className="c-form-group">
                <label>Tỉnh/Thành phố</label>
                <select name="province">
                  <option value="">-- Chọn --</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="hcm">Hồ Chí Minh</option>
                </select>
              </div>

              <div className="c-form-group">
                <label>Địa chỉ thường trú</label>
                <input type="text" name="permanentAddress" />
              </div>
            </div>

            {/* Dòng 8 */}
            <div className="c-form-row">
              <div className="c-form-group currency">
                <label>Tiền phòng *</label>
                <input type="text" name="roomPrice" defaultValue="3,000,000" />
                <span>VNĐ</span>
              </div>
              <div className="c-form-group currency">
                <label>Đặt cọc *</label>
                <input type="text" name="deposit" defaultValue="0" />
                <span>VNĐ</span>
              </div>
            </div>

            {/* Dòng 9 */}
            <div className="c-form-row">
              <div className="c-form-group">
                <label>Ngày bắt đầu *</label>
                <input type="date" name="startDate" defaultValue="2025-04-18" />
              </div>
              <div className="c-form-group">
                <label>Kỳ thanh toán *</label>
                <select name="paymentPeriod">
                  <option value="30">Kỳ 30</option>
                  <option value="15">Kỳ 15</option>
                </select>
              </div>
            </div>

            {/* Dòng 10 */}
            <div className="c-form-row">
              <div className="c-form-group">
                <label>Thanh toán mỗi lần</label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <select name="paymentEachTime">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <span>Tháng</span>
                </div>
              </div>
              <div className="c-form-group">
                <label>Số xe</label>
                <input type="text" name="vehicle" />
              </div>
            </div>

            {/* Dòng 11 */}
            <div className="c-form-row">
              <div className="c-form-group" style={{ gridColumn: "span 2" }}>
                <label>Ghi chú khác</label>
                <textarea name="notes"></textarea>
              </div>
            </div>

            {/* Hành động */}
            <div className="c-form-actions">
              <button type="button" onClick={handleBack}>
                ⬅ Quay về
              </button>
              <button type="button" onClick={handleSave}>
                ✔ Lưu
              </button>
            </div>
          </form>
        )}

        {activeTab !== "thongtin" && <p>[{activeTab}] Đang phát triển...</p>}
      </div>
    </div>
  );

  function renderTab(id, label) {
    return (
      <button
        className={activeTab === id ? "active" : ""}
        onClick={() => setActiveTab(id)}
      >
        {label}
      </button>
    );
  }
};

export default AddCustomerForm;
