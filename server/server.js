import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, createUserCollections } from "./models/User.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:8080" }));
app.use(express.json());

// Database Connection and Server Start
let db;
(async () => {
  try {
    db = await connectDB();
    await createUserCollections();
    
    // Routes
    app.use("/api/auth", authRoutes);

    // Health check
    app.get("/health", (req, res) => {
      res.json({ status: "Server is running", db: "Connected" });
    });

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📦 Database connected and ready`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
})();
