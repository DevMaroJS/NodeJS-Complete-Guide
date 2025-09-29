import Sequelize from "sequelize";
import sequelize from "../utils/database.js";

const OrderItem = sequelize.define("order_item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

export default OrderItem;
