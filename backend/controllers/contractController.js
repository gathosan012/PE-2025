import Room from "../models/Room.model.js";
import Service from "../models/Service.model.js";
export const createContract = async (req, res) => {
  try {
    const {
      roomId,
      tenantId,
      startDate,
      endDate,
      monthlyFee,
      deposit,
      status,
      //serviceIds,
    } = req.body;

    if (!roomId || !tenantId || !startDate || !endDate || !deposit) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    //get Landlord from room
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found." });

    const landlordID = room.landlordID;
    //get service of this landlord
    const services = await Service.find({ landlordID });
    const serviceIds = services.map((s) => s._id);

    //create contract
    const newContract = new Contract({
      roomId,
      tenantId,
      startDate,
      endDate,
      monthlyFee,
      deposit,
      status,
      serviceIds, // Auto-injected
    });
    await newContract.save();

    res.status(201).json({
      success: true,
      message: "Contract created successfully with landlord's services.",
      contract: newContract,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// Get all contracts
export const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find()
      .populate("roomId", "roomNumber")
      .populate("tenantId", "fullName");
    //.populate("serviceIds", "name");

    res.status(200).json(contracts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch contracts.", error: err.message });
  }
};

// Get contract by ID
export const getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate("roomId", "roomNumber")
      .populate("tenantId", "fullName");
    //.populate("serviceIds", "name");

    if (!contract)
      return res.status(404).json({ message: "Contract not found." });

    res.status(200).json(contract);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving contract.", error: err.message });
  }
};

// Update contract
export const updateContract = async (req, res) => {
  try {
    const updatedContract = await Contract.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedContract) {
      return res.status(404).json({ message: "Contract not found." });
    }

    res.json({
      message: "Contract updated successfully.",
      contract: updatedContract,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating contract.", error: err.message });
  }
};

// Delete contract
export const deleteContract = async (req, res) => {
  try {
    const deleted = await Contract.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Contract not found." });
    }

    res.json({ message: "Contract deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting contract.", error: err.message });
  }
};
