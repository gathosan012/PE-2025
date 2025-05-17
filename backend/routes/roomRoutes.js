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

const roomRouter = express.Router();

roomRouter.get("/", getAllRooms); //get room cards
roomRouter.post(
  "/",

  upload.single("image"),
  addRoom
);
roomRouter.get("/:id", getRoomById); // get room information
roomRouter.put("/:id", upload.single("image"), updateRoom); // Update RoomInfo
roomRouter.delete("/:id", deleteRoom); // Delete RoomInfo

//authenticateUser,authorizeLandlord,
export default roomRouter;
