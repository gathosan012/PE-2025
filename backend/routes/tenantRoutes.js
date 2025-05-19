import express from "express";
import {
  authenticateToken,
  authorizeLandlord,
} from "../middleware/authMiddleware.js";
import {
  getAllTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
} from "../controllers/tenantController.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeLandlord, getAllTenants);
router.get("/:id", authenticateToken, authorizeLandlord, getTenantById);
router.post("/add", authenticateToken, authorizeLandlord, createTenant);
router.put("/:id", authenticateToken, authorizeLandlord, updateTenant);
router.delete("/:id", authenticateToken, authorizeLandlord, deleteTenant);

export default router;
