import express from "express";
import user from "./user.js";
import admin from "./admin.js";

const routes = express.Router();

routes.use("/admin", admin);
routes.use("/user", user);

export default routes;
