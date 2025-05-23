import Room from "../models/Room.model.js";
import Contract from "../models/Contract.model.js";

// Add new room
export const addRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      price,
      length,
      width,
      maxPeople,
      area,
      numberBedroom,
      address,
      allowMale,
      allowFemale,
      description,
      status,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    if (
      !roomNumber ||
      !price ||
      !length ||
      !width ||
      !maxPeople ||
      !area ||
      !numberBedroom
    ) {
      return res.status(400).json({
        success: false,
        error: "Please fill in all required fields.",
      });
    }

    const newRoom = new Room({
      roomNumber,
      price,
      length,
      width,
      maxPeople,
      area,
      numberBedroom,
      address,
      allowMale,
      allowFemale,
      description,
      image,
      status,
      landlordID: req.user.id,
    });

    await newRoom.save();

    res.status(201).json({
      success: true,
      message: "Room added successfully.",
      room: newRoom,
    });
  } catch (error) {
    console.error("Error while adding room", error);
    res.status(500).json({
      success: false,
      error: "Server error while adding room.",
    });
  }
};

// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const { roomStatus, feeStatus, roomSearch, area, numberBedroom, address } =
      req.query;

    const query = {
      landlordID: req.user.id,
    };

    if (roomStatus) query.status = roomStatus;
    if (feeStatus) query.feeStatus = feeStatus;
    if (roomSearch) query.roomNumber = { $regex: roomSearch, $options: "i" };
    if (area) query.area = Number(area);
    if (numberBedroom) query.numberBedroom = Number(numberBedroom);
    if (address) query.address = { $regex: address, $options: "i" };

    const rooms = await Room.find(query).lean();

    const roomIds = rooms.map((r) => r._id);

    const activeContracts = await Contract.find({
      roomId: { $in: roomIds },
      status: "active",
    })
      .populate("tenantId", "fullname")
      .lean();

    const contractMap = {};
    activeContracts.forEach((c) => {
      contractMap[c.roomId.toString()] = {
        tenantName: c.tenantId?.fullname || null,
        contractId: c._id,
      };
    });

    const roomsWithTenant = rooms.map((room) => {
      const match = contractMap[room._id.toString()];
      return {
        ...room,
        currentTenant: match?.tenantName || null,
        currentContractId: match?.contractId || null,
      };
    });

    res.status(200).json(roomsWithTenant);
  } catch (err) {
    console.error("❌ getAllRooms failed:", err);
    res.status(500).json({
      message: "Error fetching room list",
      error: err.message,
    });
  }
};

// Get room by ID
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) return res.status(404).json({ message: "Room not found." });

    // Check if the user is the landlord of the room
    if (room.landlordID.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this room." });
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving room.",
      error: err.message,
    });
  }
};

// Update room
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) return res.status(404).json({ message: "Room not found." });

    // Check if the user is the landlord of the room
    if (room.landlordID.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this room." });
    }

    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Room updated successfully.",
      room: updatedRoom,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating room.",
      error: err.message,
    });
  }
};

// Delete room
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room)
      return res.status(404).json({ message: "Room not found to delete." });

    // check authentication
    if (room.landlordID.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this room." });
    }

    await room.deleteOne();

    res.json({ message: "Room deleted successfully." });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({
      message: "Server error while deleting room.",
    });
  }
};
