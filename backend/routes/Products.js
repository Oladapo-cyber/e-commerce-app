import express from "express";
import {
  addProducts,
  deleteProduct,
  getProductById,
  getProducts,
  updateProductPatch,
} from "../controllers/Products.js";

const router = express.Router();

router.post("/add", addProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);

//Added the delete and patch routes to the router
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProductPatch);

export default router;
