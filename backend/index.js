/* global process */

// Import necessary modules and dependencies
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UserRouter from "./routes/User.js";
import ProductRoutes from "./routes/Products.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware setup
// Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: "https://dapstore.netlify.app",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" })); // Parse JSON requests with a size limit
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Define a basic route for testing the server
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello World", // Response message
  });
});

// API routes
app.use("/api/user", UserRouter); // User-related routes
app.use("/api/products", ProductRoutes); // Product-related routes

// Error-handling middleware (moved after the routes)
app.use((err, req, res, next) => {
  const status = err.status || 500; // Default to status 500 if not provided
  const message = err.message || "Something went wrong!"; // Default error message
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Function to connect to MongoDB
const connectDB = () => {
  mongoose.set("strictQuery", true); // Enable strict query mode
  mongoose
    .connect(process.env.MONGO_DB) // Connect to MongoDB using the connection string from .env
    .then(() => console.log("Connected to mongo DB successfully"))
    .catch((err) => {
      console.error("Failed to connect with mongo");
      console.error(err);
    });
};

// Function to start the server
const startServer = async () => {
  try {
    connectDB(); // Establish database connection
    app.listen(8080, () => console.log("Server started on port 8080")); // Start the server on port 8080
  } catch (error) {
    console.log(error); // Log any errors during server startup
  }
};

// Start the server
startServer();
