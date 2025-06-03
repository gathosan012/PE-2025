import express from "express";
import { registerUser, SignInUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/signin", SignInUser);
export default router;
