import http from "http";
import express from "express";
import routes from "./routes/main.js";
import sequelize from "./utils/database.js";

const app = express();
const server = http.createServer(app);

const parseJSON = express.json({ limit: "5mb" });

app.use(parseJSON);

app.use(routes);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
