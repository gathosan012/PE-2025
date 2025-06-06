import Service from "../models/Service.model.js";

export const createService = async (req, res) => {
  try {
    const { name, price, type, description } = req.body;
    const landlordID = req.user?.id;

    if (!name || !price || !type) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (name, price, type).",
      });
    }

    const newService = new Service({
      name,
      price,
      type,
      description,
      landlordID,
    });

    const saved = await newService.save();

    return res.status(201).json({
      success: true,
      message: "Service created successfully.",
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

// ✅ Lấy toàn bộ dịch vụ theo landlord
export const getAllServices = async (req, res) => {
  try {
    const landlordID = req.user?.id;
    const services = await Service.find({
      landlordID,
      status: { $ne: "deleted" },
    });

    return res.json({
      success: true,
      message: "Fetched services successfully.",
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

// ✅ Lấy 1 dịch vụ theo ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const landlordID = req.user?.id;

    const service = await Service.findOne({ _id: id, landlordID });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    return res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

// ✅ Cập nhật dịch vụ
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const landlordID = req.user?.id;
    const updateData = req.body;

    const updated = await Service.findOneAndUpdate(
      { _id: id, landlordID },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Service not found or unauthorized.",
      });
    }

    return res.json({
      success: true,
      message: "Service updated successfully.",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

// ✅ Xóa dịch vụ
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const landlordID = req.user?.id;

    const deleted = await Service.findOneAndDelete({ _id: id, landlordID });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Service not found or unauthorized.",
      });
    }

    return res.json({
      success: true,
      message: "Service deleted successfully.",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};
