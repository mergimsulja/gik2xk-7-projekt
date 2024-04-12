const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../../middleware/auth");
const userController = require("../../controllers/userController");

router.get("/:id/getCart", authenticateJWT, userController.getCartItems);
router.post("/:id/createCart", authenticateJWT, userController.createCart);
router.put("/:id/updateCart", authenticateJWT, userController.updateCart);
router.delete("/:id/deleteCart", authenticateJWT, userController.deleteCart);

module.exports = router;
