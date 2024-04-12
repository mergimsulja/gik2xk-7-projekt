// controllers/productController.js
const productService = require("../services/productService");
const createError = require("http-errors");

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.send(products);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal server error"));
  }
};

const getProductById = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await productService.getProductById(productId);
    if (!product) {
      return next(createError(404, "Product not found"));
    }
    res.json(product);
  } catch (error) {
    next(createError(500, error.message));
  }
};

const addRatingToProduct = async (req, res, next) => {
  const productId = req.params.id;
  const { ratingValue } = req.body;
  try {
    const rating = await productService.addRatingToProduct(
      productId,
      ratingValue
    );
    res.status(200).json({ message: "Rating added successfully", rating });
  } catch (error) {
    next(createError(500, error.message));
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;
    const imageUrl = req.file.path;

    const product = await productService.createProduct(
      title,
      description,
      price,
      imageUrl
    );
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }
    const updatedProduct = await productService.updateProduct(
      productId,
      updateData
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const result = await productService.deleteProduct(productId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addRatingToProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
