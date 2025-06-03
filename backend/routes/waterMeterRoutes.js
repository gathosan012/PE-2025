import express from "express";
import {
  authenticateToken,
  authorizeLandlord,
} from "../middleware/authMiddleware.js";
import {
  createWaterMeter,
  getWaterMeterHistory,
  getRoomWater,
} from "../controllers/waterMeterController.js";

const waterRoutes = express.Router();

waterRoutes.get("/index", authenticateToken, authorizeLandlord, getRoomWater);

waterRoutes.post(
  "/add-new-meters",
  authenticateToken,
  authorizeLandlord,
  createWaterMeter
);

waterRoutes.get(
  "/history",
  authenticateToken,
  authorizeLandlord,
  getWaterMeterHistory
);

export default waterRoutes;
