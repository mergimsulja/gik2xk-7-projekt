// models/index.js
const User = require("./user");
const Cart = require("./cart");
const CartRow = require("./cartRow");
const Product = require("./products");
const Rating = require("./ratings");

User.hasMany(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartRow);
CartRow.belongsTo(Cart);

CartRow.belongsTo(Product);
Product.hasMany(CartRow);

Product.hasMany(Rating);
Rating.belongsTo(Product);

module.exports = {
  User,
  Cart,
  CartRow,
  Product,
  Rating,
};
