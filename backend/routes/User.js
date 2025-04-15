// Import express module
import express from "express";

// Import controller functions for user operations
import {
  addToCart,
  addToFavorites,
  getAllCartItems,
  getAllOrders,
  getUserFavorites,
  placeOrder,
  removeFromCart,
  removeFromFavorites,
  UserLogin,
  UserRegister,
} from "../controllers/Users.js";

// Import middleware for token verification
import { verifyToken } from "../middlewares/verifyToken.js";

// Create a new router instance
const router = express.Router();

// User registration route with token verification
router.post("/signup", UserRegister);

// User login route
router.post("/signin", UserLogin);

// --- Cart Routes ---

// Get all items in the user's cart
router.get("/cart", verifyToken, getAllCartItems);

// Add an item to the user's cart
router.post("/cart", verifyToken, addToCart);

// Remove an item from the user's cart
router.patch("/cart", verifyToken, removeFromCart);

// --- Order Routes ---

// Get all orders for the user
router.get("/order", verifyToken, getAllOrders);

// Place a new order
router.post("/order", verifyToken, placeOrder);

// --- Favorites Routes ---

// Get all favorite items for the user
router.get("/favorite", verifyToken, getUserFavorites);

// Add an item to the user's favorites
router.post("/favorite", verifyToken, addToFavorites);

// Remove an item from the user's favorites
router.patch("/favorite", verifyToken, removeFromFavorites);

// Export the router to be used in other parts of the application
export default router;
