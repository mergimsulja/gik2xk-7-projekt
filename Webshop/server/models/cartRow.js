// models/cartRow.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class CartRow extends Model {}

CartRow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 0,
        isNumeric: true,
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
    },
    cart_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "cart",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "cart_row",
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = CartRow;
