import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const useMongo = process.env.USE_MONGO === "true";

// Middleware
app.use(bodyParser.json());

// Connect DB if Mongo is used
if (useMongo) {
  connectDB();
}

// Routes
app.use("/api/users", userRoutes);

// Root Route
app.get("/", (req, res) => res.send("Users API running..."));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
