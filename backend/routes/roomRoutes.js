import express from "express";
import {
  authenticateToken,
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

roomRoutes.get("/", authenticateToken, authorizeLandlord, getAllRooms);
roomRoutes.post(
  "/",
  authenticateToken,
  authorizeLandlord,
  upload.single("image"),
  addRoom
);
roomRoutes.get("/:id", authenticateToken, authorizeLandlord, getRoomById);
roomRoutes.put(
  "/:id",
  authenticateToken,
  authorizeLandlord,
  upload.single("image"),
  updateRoom
);
roomRoutes.delete("/:id", authenticateToken, authorizeLandlord, deleteRoom);

export default roomRoutes;
