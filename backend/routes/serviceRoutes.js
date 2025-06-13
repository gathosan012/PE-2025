import express from "express";
import {
  authenticateToken,
  authorizeLandlord,
} from "../middleware/authMiddleware.js";

import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const serviceRoutes = express.Router();

serviceRoutes.get("/test", (req, res) => {
  res.send("✅ Service route test works!");
});
serviceRoutes.post(
  "/create-service",
  authenticateToken,
  authorizeLandlord,
  createService
);
serviceRoutes.get("/", authenticateToken, authorizeLandlord, getAllServices);
serviceRoutes.get(
  "/service/:id",
  authenticateToken,
  authorizeLandlord,
  getServiceById
);
serviceRoutes.put(
  "/update-service/:id",
  authenticateToken,
  authorizeLandlord,
  updateService
);
serviceRoutes.delete(
  "/delete-service/:id",
  authenticateToken,
  authorizeLandlord,
  deleteService
);

export default serviceRoutes;
