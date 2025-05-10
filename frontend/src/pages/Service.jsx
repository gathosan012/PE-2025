import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceTable from "../components/ServiceTable";
import "../styling/service.scss";
import SidePanel from "../components/SidePanel";
import ServiceForm from "./ServiceForm";

const initialServices = [
  { id: 1, name: "Điện", type: "ĐIỆN", price: 3000, active: true },
  { id: 2, name: "Gửi xe máy", type: "KHÁC", price: 80000, active: true },
  { id: 3, name: "Nước", type: "NƯỚC", price: 20000, active: true },
  { id: 4, name: "Rác", type: "KHÁC", price: 50000, active: false },
];

export default function Service() {
  const [services, setServices] = useState(initialServices);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isClicked, setIsClicked] = useState(false)

  const navigate = useNavigate();

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    const confirmed = window.confirm("Xoá các dịch vụ đã chọn?");
    if (confirmed) {
      setServices(services.filter((s) => !selectedIds.includes(s.id)));
      setSelectedIds([]);
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Xoá dịch vụ này?");
    if (confirmed) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  return (
    <div className={ isClicked ? "service-wrapper toggled" : "service-wrapper"}>
      {
        isClicked && <ServiceForm toggleStatus={isClicked} toggleFunction={setIsClicked}></ServiceForm>
      }
      <SidePanel selected="service" />
      <div className="service-content">
        <div className="service-container">
          <div className="service-page">
            <h1 className="service-title">Danh sách dịch vụ</h1>
            <div className="actions">
              <button className="add" onClick={() => setIsClicked(!isClicked)}>
                + Thêm dịch vụ
              </button>
              <button
                className="delete"
                onClick={handleDeleteSelected}
                disabled={selectedIds.length === 0}
              >
                ❌ Xóa
              </button>
            </div>
          </div>
          {/* Ô tìm kiếm */}
          <div className="service-search-bar">
            <input
              type="text"
              placeholder="Tìm theo tên dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="service-table">
            <ServiceTable
              services={services}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              onDelete={handleDelete}
              onEdit={(id) => navigate(`/edit-service/${id}`)}
            />
          </div>
        </div>
        </div>
        
    </div>
  );
}
