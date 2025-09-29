// controllers/userController.js
import dotenv from 'dotenv';
import UserModel from '../models/userModel.js'; // MongoDB model
import * as memoryUser from '../models/userMemory.js'; // In-memory model

dotenv.config();

// Toggle storage type
const useMongo = process.env.USE_MONGO === 'true';
const User = useMongo ? UserModel : memoryUser;

// --- CRUD Functions ---

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    if (useMongo) {
      const users = await User.find();
      return res.json(users);
    }
    res.json(User.getAll());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    if (useMongo) {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(user);
    }
    const user = User.getById(parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (useMongo) {
      const newUser = new User({ name, email });
      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    }

    const user = User.create({ name, email });
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
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (name) user.name = name;
      if (email) user.email = email;

      const updatedUser = await user.save();
      return res.json(updatedUser);
    }

    const user = User.update(parseInt(req.params.id), { name, email });
    if (!user) return res.status(404).json({ message: 'User not found' });
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
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json({ message: 'User deleted', user });
    }

    const user = User.remove(parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
