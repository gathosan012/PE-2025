import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServiceTable from "../components/ServiceTable";
import "../styling/service.scss";
import SidePanel from "../components/SidePanel";
import ServiceForm from "./ServiceForm";
import axios from "axios";

export default function Service() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // chỉ ẩn deleted
      const filtered = (response.data.data || []).filter(
        (s) => s.status !== "deleted"
      );
      setServices(filtered);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreateService = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5000/api/services/create-service",
        { ...data, status: "active" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchServices();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  // toggle giữa active <-> inactive
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:5000/api/services/update-service/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchServices();
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

  // soft delete
  const handleSoftDelete = async (id) => {
    const confirmed = window.confirm(
      "Do you want to permanently hide this service?"
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://localhost:5000/api/services/update-service/${id}`,
        { status: "deleted" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchServices(); // không cần filter nữa, vì BE đã xử lý
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div
      className={isFormVisible ? "service-wrapper toggled" : "service-wrapper"}
    >
      {isFormVisible && (
        <ServiceForm
          onSubmit={handleCreateService}
          toggleStatus={isFormVisible}
          toggleFunction={setIsFormVisible}
        />
      )}
      <SidePanel selected="service" />
      <div className="service-content">
        <div className="service-container">
          <div className="service-page">
            <h1 className="service-title">Service List</h1>
            <div className="actions">
              <button
                className="add"
                onClick={() => setIsFormVisible(!isFormVisible)}
              >
                Add Service
              </button>
            </div>
          </div>

          <div className="service-search-bar">
            <input
              type="text"
              placeholder="Search by service name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="service-table">
            <ServiceTable
              services={services.filter((s) =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              onEdit={(id) => navigate(`/edit-service/${id}`)}
              onToggleStatus={handleToggleStatus}
              onSoftDelete={handleSoftDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
