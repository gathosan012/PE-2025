import Room from "../models/Room.model.js";

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
      //landlordID,
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
      landlordID: "6806750b7c3816985129f742", // this should be dynamic if you implement authentication
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

    const query = {};

    if (roomStatus) query.status = roomStatus;
    if (feeStatus) query.feeStatus = feeStatus;
    if (roomSearch) query.roomNumber = { $regex: roomSearch, $options: "i" };
    if (area) query.area = Number(area);
    if (numberBedroom) query.numberBedroom = Number(numberBedroom);
    if (address) query.address = { $regex: address, $options: "i" };

    const rooms = await Room.find(query).populate("landlordID", "fullname");

    res.status(200).json(rooms);
  } catch (err) {
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
    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found." });
    }

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
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found to delete." });
    }
    res.json({ message: "Room deleted successfully." });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({
      message: "Server error while deleting room.",
    });
  }
};
