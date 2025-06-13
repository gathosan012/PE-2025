import express from "express";
import {
  authenticateToken,
  authorizeLandlord,
} from "../middleware/authMiddleware.js";
import {
  createElectricMeter,
  getElectricMeterHistory,
  getRoomElectric,
} from "../controllers/electricMeterController.js";

const electricRoutes = express.Router();

electricRoutes.get(
  "/index",
  authenticateToken,
  authorizeLandlord,
  getRoomElectric
);

electricRoutes.post(
  "/add-new-meters",
  authenticateToken,
  authorizeLandlord,
  createElectricMeter
);

electricRoutes.get(
  "/history",
  authenticateToken,
  authorizeLandlord,
  getElectricMeterHistory
);

export default electricRoutes;
