const cartService = require("../services/cartService");

const addToCart = async (req, res, next) => {
  try {
    const { productId, amount } = req.body;
    const userId = req.user.id;
    const cartItem = await cartService.addToCart(userId, productId, amount);
    res
      .status(200)
      .json({ message: "Product added to cart successfully", cartItem });
  } catch (error) {
    next(error);
  }
};

module.exports = { addToCart };
