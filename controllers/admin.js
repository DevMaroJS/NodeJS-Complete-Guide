import { session } from "../routes/main.js";

export const profile = (req, res) => {
  if (session.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return res.json({ message: "Profile" });
};

export const settings = (req, res) => {
  if (session.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return res.json({ message: "settings" });
};
