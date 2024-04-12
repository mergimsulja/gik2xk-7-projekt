// models/rating.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "rating",
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = Rating;
