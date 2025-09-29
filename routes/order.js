import express from "express";
import { getOrders, createOrder } from "../controllers/order.js";

const orderRoutes = express.Router();

// Routes for order management
orderRoutes.get("/", getOrders);

orderRoutes.post("/create", createOrder);

export default orderRoutes;
