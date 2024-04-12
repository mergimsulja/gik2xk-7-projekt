// models/cart.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    payed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "cart",
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = Cart;
