// services/productService.js
const { Product, Rating } = require("../models");

const getAllProducts = async () => {
  const products = await Product.findAll({
    include: [Rating],
  });
  const productsWithRating = products.map(product => {
    const ratings = product.ratings.map(rating => rating.rating);
    const averageRating = ratings.reduce((acc, cur) => acc + cur, 0) / ratings.length;
    return { ...product.toJSON(), averageRating };
  });
  
  return productsWithRating;
};

const getProductById = async (productId) => {
  const product = await Product.findByPk(productId, {
    include: [Rating],
  });
  if (!product) {
    throw new Error("Product not found");
  }
  const ratings = product.ratings.map(rating => rating.rating);
  const averageRating = ratings.reduce((acc, cur) => acc + cur, 0) / ratings.length;
  return { ...product.toJSON(), averageRating };
};

const addRatingToProduct = async (productId, ratingValue) => {
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
          throw new Error('Product not found');
        }
    
        if (ratingValue < 1 || ratingValue > 5) {
          throw new Error('Rating value must be between 1 and 5');
        }
        const rating = await Rating.create({ rating: ratingValue, product_id: productId });
        return rating;
      } catch (error) {
        throw new Error(error.message);
      }
};

const createProduct = async (title, description, price, imageUrl) => {
  try {
    const product = await Product.create({
      title,
      description,
      price,
      imageUrl,
    });
    return product;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

const updateProduct = async (productId, updateData) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    await product.update(updateData);
    return product;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

const deleteProduct = async (productId) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    await product.destroy();
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete product: " + error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addRatingToProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
