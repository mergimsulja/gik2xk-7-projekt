const userService = require("../services/userService");

const getCartItems = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const products = await userService.getCartItems(userId);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const createCart = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const newCart = await userService.createCart(userId);
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const payed = req.body.payed;
    await userService.updateCart(userId, payed);
    res.status(200).json({ message: "Shopping cart updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await userService.deleteCart(userId);
    res.status(200).json({ message: "Shopping cart deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCartItems, createCart, updateCart,deleteCart };
