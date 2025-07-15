import { session } from "../routes/main.js";

export const login = (req, res) => {
  if (session.email) {
    return res.status(400).json({ error: "Session active" });
  }

  session.name = req.body.name;
  session.email = req.body.email;
  session.role = req.body.role;
  return res.status(200).json({ message: "Login success" });
};

export const getSelf = (req, res) => {
  return res.json(session);
};

export const logout = (req, res) => {
  session.name = "";
  session.email = "";
  session.role = "";
  return res.json({ message: "Logout success" });
};
