import express from "express";
import user from "./user.js";
import admin from "./admin.js";
import product from "./product.js";
import cart from "./cart.js";
import { notFound } from "../controllers/notFound.js";

const routes = express.Router();
export const session = { name: "", email: "", role: "" };

routes.use("/admin", admin);
routes.use("/user", user);
routes.use("/product", product);
routes.use("/product", product);
routes.use("/cart", cart);
routes.use(notFound);

export default routes;
