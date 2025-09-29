import http from "http";
import express from "express";
import routes from "./routes/main.js";
import sequelize from "./utils/database.js";
import User from "./models/user.js";
import Product from "./models/product.js";
import Cart from "./models/cart.js";
import CartItem from "./models/cartItem.js";
import Order from "./models/order.js";
import OrderItem from "./models/order-item.js";

const app = express();
const server = http.createServer(app);

const parseJSON = express.json({ limit: "5mb" });

app.use(parseJSON);

app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    if (user) {
      req.user = user;
      req.session = { name: user.name, email: user.email, role: "admin" };
      next();
    }
  } catch (error) {
    console.log(err);
    next();
  }
});

app.use(routes);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  .sync({
    // use `force: true` to drop and recreate tables
    // force: true,
  })
  .then(async () => {
    const firstUser = await User.findByPk(1);
    if (!firstUser) {
      return User.create({
        name: "Peter Parker",
        email: "spiderman@avengers.com",
      });
    }
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
