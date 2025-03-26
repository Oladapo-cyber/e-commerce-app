import express from "express";
import {
  addProducts,
  getProductById,
  getProducts,
} from "../controllers/Products";

const router = express.Router();

router.post("/add", addProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
