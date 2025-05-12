import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.model.js";

dotenv.config();
const JWT_SECRET = process.env.SECRET_KEY;
if (!JWT_SECRET) {
  console.error("❌ ERROR: SECRET_KEY is not set in the .env file");
  process.exit(1);
}

// Authenticate token (used for routes that require login)
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "No token provided. Access denied!" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token!" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT authentication error:", error);
    return res.status(403).json({ message: "Invalid or expired token!" });
  }
};

// Authorization middleware for landlords only
const authorizeLandlord = (req, res, next) => {
  if (!req.user || req.user.role !== "landlord") {
    return res.status(403).json({
      message: "Access denied. Landlord role required.",
    });
  }
  next();
};

export { authenticateUser, authorizeLandlord };
