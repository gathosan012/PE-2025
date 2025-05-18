import express from "express";
import {
  authenticateUser,
  authorizeLandlord,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import {
  addRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";

const roomRoutes = express.Router();

roomRoutes.get("/", getAllRooms); //get room cards
roomRoutes.post(
  "/",

  upload.single("image"),
  addRoom
);
roomRoutes.get("/:id", getRoomById); // get room information
roomRoutes.put("/:id", upload.single("image"), updateRoom); // Update RoomInfo
roomRoutes.delete("/:id", deleteRoom); // Delete RoomInfo

//authenticateUser,authorizeLandlord,
export default roomRoutes;
