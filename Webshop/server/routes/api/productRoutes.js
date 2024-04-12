// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");
const upload = require("../../middleware/upload");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/:id/addRating", productController.addRatingToProduct);
router.post("/", upload, productController.createProduct);
router.put("/:id", upload, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
