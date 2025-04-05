import express from "express";
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
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", verifyToken, UserRegister);
router.post("/signin", verifyToken, UserLogin);

//Cart routes
router.get("/cart", verifyToken, getAllCartItems);
router.post("/cart", verifyToken, addToCart);
router.patch("/cart", verifyToken, removeFromCart);

//Order routes
router.get("/order", verifyToken, getAllOrders);
router.post("/order", verifyToken, placeOrder);

//Favorites routes
router.get("/favorite", verifyToken, getUserFavorites);
router.post("/favorite", verifyToken, addToFavorites);
router.patch("/favorite", verifyToken, removeFromFavorites);
export default router;
