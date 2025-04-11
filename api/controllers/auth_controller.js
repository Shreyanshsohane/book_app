import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user_model.js";

export const register = async (req, res) => {
  try {
    const { name, mobileNumber, email, password, role } = req.body;

    if (!name || !mobileNumber || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["owner", "seeker"].includes(role.toLowerCase())) {
      return res
        .status(400)
        .json({ message: "Role must be either 'owner' or 'seeker'" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      mobileNumber,
      email,
      password: hashedPassword,
      role: role.toLowerCase(),
    });

    const savedUser = await newUser.save();

    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
