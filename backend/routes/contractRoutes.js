import express from "express";
import {
  createContract,
  getAllContracts,
  getContractById,
} from "../controllers/contractController.js";
import {
  authenticateToken,
  authorizeLandlord,
} from "../middleware/authMiddleware.js";

const contractRoutes = express.Router();

contractRoutes.post(
  "/add",
  authenticateToken,
  authorizeLandlord,
  createContract
);
contractRoutes.get("/", authenticateToken, authorizeLandlord, getAllContracts);
contractRoutes.get(
  "/:id",
  authenticateToken,
  authorizeLandlord,
  getContractById
);

export default contractRoutes;
