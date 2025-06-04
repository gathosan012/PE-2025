import { Router } from "express";
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

const serviceRouter = Router();

serviceRouter.post(
  "/create-service",
  authenticateToken,
  authorizeLandlord,
  createService
);
serviceRouter.get(
  "/list-services",
  authenticateToken,
  authorizeLandlord,
  getAllServices
);
serviceRouter.get(
  "/service/:id",
  authenticateToken,
  authorizeLandlord,
  getServiceById
);
serviceRouter.put(
  "/update-service/:id",
  authenticateToken,
  authorizeLandlord,
  updateService
);
serviceRouter.delete(
  "/delete-service/:id",
  authenticateToken,
  authorizeLandlord,
  deleteService
);

export default serviceRouter;
