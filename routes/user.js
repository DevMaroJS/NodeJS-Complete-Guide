import express from "express";

const userRoutes = express.Router();

userRoutes.get("/login", (req, res) => {
  console.log(req.body);
  res.send(`<h1>Login</h1>`);
});

userRoutes.get("/logout", (req, res) => {
  console.log(req.body);
  res.send(`<h1>Logout</h1>`);
});

export default userRoutes;
