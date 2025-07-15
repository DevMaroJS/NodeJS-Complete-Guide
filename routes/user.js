import express from "express";
import { login, logout, getSelf } from "../controllers/user.js";

const userRoutes = express.Router();

userRoutes.post("/login", login);

userRoutes.post("/logout", logout);

userRoutes.get("/self", getSelf);

export default userRoutes;
