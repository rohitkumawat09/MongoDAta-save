import dotenv from "dotenv";
dotenv.config();

let User;
let memoryUser;

const useMongo = process.env.USE_MONGO === "true";

if (useMongo) {
  const { default: UserModel } = await import("../models/userModel.js");
  User = UserModel;
} else {
  memoryUser = await import("../models/userMemory.js");
}

// --- CRUD ---

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    if (useMongo) {
      const users = await User.find();
      return res.json(users);
    }
    res.json(memoryUser.getAll());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    if (useMongo) {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json(user);
    }
    const user = memoryUser.getById(parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create user
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (useMongo) {
      const newUser = new User({ name, email });
      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    }
    const user = memoryUser.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (useMongo) {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      if (name) user.name = name;
      if (email) user.email = email;
      const updatedUser = await user.save();
      return res.json(updatedUser);
    }
    const user = memoryUser.update(parseInt(req.params.id), { name, email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    if (useMongo) {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.json({ message: "User deleted", user });
    }
    const user = memoryUser.remove(parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
