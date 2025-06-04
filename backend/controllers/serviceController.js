import Service from "../models/Service.model.js";

// Create a new service
export const createService = async (req, res) => {
  try {
    const { name, price, type, description } = req.body;
    const landlordID = req.user?.id;

    if (!name || !price || !type) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }

    const newService = new Service({
      name,
      price,
      type,
      description,
      landlordID,
    });

    const savedService = await newService.save();

    return res.status(201).json({
      message: "Service created successfully.",
      success: true,
      data: savedService,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error.",
      success: false,
    });
  }
};

// Get a service by ID (only if owned by landlord)
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const landlordID = req.user?.id;

    const service = await Service.findOne({ _id: id, landlordID });

    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
        success: false,
      });
    }

    return res.json({
      message: "Service retrieved successfully.",
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error.",
      success: false,
    });
  }
};

// Get all services by landlord
export const getAllServices = async (req, res) => {
  try {
    const landlordID = req.user?.id;
    const services = await Service.find({ landlordID });

    return res.json({
      message: "Services retrieved successfully.",
      success: true,
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error.",
      success: false,
    });
  }
};

// Update a service (only if owned by landlord)
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const landlordID = req.user?.id;
    const updateData = req.body;

    const service = await Service.findOneAndUpdate(
      { _id: id, landlordID },
      updateData,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found or not owned by user.",
        success: false,
      });
    }

    return res.json({
      message: "Service updated successfully.",
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error.",
      success: false,
    });
  }
};

// Delete a service (only if owned by landlord)
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const landlordID = req.user?.id;

    const deleted = await Service.findOneAndDelete({ _id: id, landlordID });

    if (!deleted) {
      return res.status(404).json({
        message: "Service not found or not owned by user.",
        success: false,
      });
    }

    return res.json({
      message: "Service deleted successfully.",
      success: true,
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error.",
      success: false,
    });
  }
};
