import React, { useState } from "react";
import "../styling/components/ServiceForm.scss";
import { useNavigate } from "react-router-dom";

function ServiceForm({
  title = "Thêm dịch vụ",
  initialData = { name: "", type: "", price: 0, active: true, note: "" },
  onSubmit,
  onCancel,
  toggleStatus,
  toggleFunction
}) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Tên là bắt buộc";
    if (!formData.type) newErrors.type = "Loại là bắt buộc";
    if (formData.price <= 0) newErrors.price = "Đơn giá phải lớn hơn 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="service-form">
      <h2 className="edit-form-title">{title}</h2>

      <div className="edit-form-grid">
        <div className="edit-form-group">
          <label className="service-label">Tên *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="service-input"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* Đơn giá và Đang dùng cùng hàng */}
        <div className="edit-form-group">
          <label className="service-label">Đơn giá *</label>
          <div className="flex items-center">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="service-input"
            />
            <span className="currency">VND</span>
          </div>
          {errors.price && <div className="error">{errors.price}</div>}
        </div>

        <div className="edit-form-group">
          <label className="label-inline">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="service-checkbox"
            />
            Đang dùng
          </label>
        </div>

        <div className="edit-form-group full-row">
          <label className="service-label">Ghi chú</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="textarea"
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <p className="text-red-600 text-sm">(*): Thông tin bắt buộc</p>
        <div className="space-x-2">
          <button className="btn-back" onClick={() => toggleFunction(!toggleStatus)}>
            ⬅ Quay về
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ✅ Lưu
          </button>
        </div>
      </div>
    </form>
  );
}

export default ServiceForm;