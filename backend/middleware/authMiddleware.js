import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_CODE } = process.env;

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Access token missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_CODE);
    req.user = decoded; // Gắn user info vào request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

export const authorizeLandlord = (req, res, next) => {
  if (req.user.role !== "landlord") {
    return res.status(403).json({ message: "Landlord access required" });
  }
  next();
};
