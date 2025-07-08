import http from "http";
import routes from "./routes.js";

const server = http.createServer(routes);

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
