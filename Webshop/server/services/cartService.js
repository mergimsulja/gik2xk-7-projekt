const { Cart, CartRow } = require("../models");

const addToCart = async (userId, productId, amount) => {
  try {
    let cart = await Cart.findOne({ where: { user_id: userId } });

    if (!cart) {
      cart = await Cart.create({ user_id: userId });
    }

    let cartRow = await CartRow.findOne({
      where: { cart_id: cart.id, product_id: productId },
    });

    if (cartRow) {
    //   cartRow.amount += amount;
        cartRow.amount = amount;
      await cartRow.save();
    } else {
      cartRow = await CartRow.create({
        cart_id: cart.id,
        product_id: productId,
        amount: amount,
      });
    }
    return cartRow;
  } catch (error) {
    throw new Error(error.message || "Failed to add product to cart");
  }
};
module.exports = { addToCart };
