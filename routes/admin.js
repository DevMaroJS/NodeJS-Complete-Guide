import express from "express";

const adminRoutes = express.Router();

adminRoutes.use("/", (req, res) => {
  console.log(req.body);
  res.send(`<h1>Hello there!</h1>`);
});

export default adminRoutes;
