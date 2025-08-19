import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ msg: "User registered successfully", user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Signup error:", err.message); 
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, bio, dateOfBirth } = req.body;
    const profileImage = req.file?.path;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (dateOfBirth !== undefined && dateOfBirth !== "") {
        user.dateOfBirth = new Date(dateOfBirth);
    }
    if (profileImage) {
        user.profileImage = profileImage;
    }

    await user.save();
    
    const updatedUser = await User.findById(user._id).select("-password");

    res.json({ msg: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).send("Server error");
  }
};