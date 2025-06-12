import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_CODE = process.env.SECRET_KEY;
export const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password, phone_number } = req.body;
    // Validate input

    // Check email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      phone_number,
      role: "landlord", // Default role
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const SignInUser = async (req, res) => {
  try {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email is not registered." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password!" });
    }
    console.log("User role on sign in:", user.role);
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      SECRET_CODE,
      { expiresIn: "1d" }
    );

    user.password = undefined;
    res.status(200).json({
      message: "User signed in successfully",
      user,
      accessToken,
    });
  } catch (err) {
    console.error("SignInUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
