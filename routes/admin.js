import express from "express";

const adminRoutes = express.Router();

adminRoutes.get("/profile", (req, res) => {
  console.log(req.body);
  res.send(`<h1>Profile</h1>`);
});

adminRoutes.get("/settings", (req, res) => {
  console.log(req.body);
  res.send(`<h1>Settings</h1>`);
});

export default adminRoutes;
