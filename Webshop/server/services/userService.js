const { Cart, CartRow, Product } = require("../models");

const getCartItems = async (userId) => {
  const cart = await Cart.findOne({
    where: { user_id: userId },
    include: [{ model: CartRow, include: [Product] }],
  });
  if (!cart) {
    throw new Error("Cart not found");
  }

  console.log(cart.cart_rows.map((row) => row.product.toJSON()));

  return cart.cart_rows.map((row) => ({
    product: {
      ...row.product.toJSON(),
      amount: row.amount,
    },
  }));
};

const createCart = async (userId) => {
  const existingCart = await Cart.findOne({ where: { user_id: userId } });
  if (existingCart) {
    throw new Error("User already has a shopping cart");
  }
  return await Cart.create({ user_id: userId });
};

const updateCart = async (userId, payed) => {
  const cart = await Cart.findOne({ where: { user_id: userId } });
  if (!cart) {
    throw new Error("Cart not found");
  }
  await cart.update({ payed });
};

const deleteCart = async (userId) => {
  const cart = await Cart.findOne({ where: { user_id: userId } });
  if (!cart) {
    throw new Error("Cart not found");
  }
  await cart.destroy();
};

module.exports = { getCartItems, createCart, updateCart, deleteCart };
