import Sequelize from "sequelize";
import sequelize from "../utils/database.js";

const CartItem = sequelize.define("cart_items", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

export default CartItem;
