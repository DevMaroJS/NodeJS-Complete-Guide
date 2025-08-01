import express from "express";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
  updateCartItemQuantity,
  getCartItems,
} from "../controllers/cart.js";

const cartRoutes = express.Router();

// Routes for cart management
cartRoutes.get("/", getCart);
cartRoutes.delete("/clear", clearCart);

// Routes for cart item management
cartRoutes.post("/item/add", addItemToCart);
cartRoutes.get("/item", getCartItems);
cartRoutes.put("/item/update", updateCartItemQuantity);
cartRoutes.delete("/item/remove", removeItemFromCart);

export default cartRoutes;
