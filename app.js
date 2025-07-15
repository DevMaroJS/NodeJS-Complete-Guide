import http from "http";
import express from "express";
import routes from "./routes/main.js";

const app = express();

const server = http.createServer(app);

const parseJSON = express.json({ limit: "5mb" });

app.use(parseJSON);

app.use(routes);

app.use((req, res) => {
  res.status(404).send("<h1>Not found.</h1>");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
