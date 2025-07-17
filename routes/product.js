import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";

const productRoutes = express.Router();

productRoutes.post("/", createProduct);

productRoutes.get("/list", getProducts);

productRoutes.get("/:id", getProduct);

productRoutes.put("/:id", updateProduct);

productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
