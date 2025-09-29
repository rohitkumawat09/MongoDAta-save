import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const useMongo = process.env.USE_MONGO === 'true';

// Connect DB if Mongo is used
if (useMongo) connectDB();

// Middleware
app.use(express.json()); // ✅ built-in JSON parser

// Routes
app.use('/api/users', userRoutes);

// Root
app.get('/', (req, res) => res.send('Users API running'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
