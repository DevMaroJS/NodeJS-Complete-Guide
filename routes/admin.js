import express from "express";
import { profile, settings } from "../controllers/admin.js";

const adminRoutes = express.Router();

adminRoutes.get("/profile", profile);

adminRoutes.get("/settings", settings);

export default adminRoutes;
