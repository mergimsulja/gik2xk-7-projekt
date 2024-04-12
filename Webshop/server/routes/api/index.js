const router = require("express").Router();
const { loginUser, registerUser } = require("../../controllers/authController");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const cartRoutes = require("./cartRoutes");
const { authenticateJWT, authorizeRole } = require("../../middleware/auth");

router.post("/login", loginUser);
router.post("/register", registerUser);

router.use("/products", authenticateJWT, productRoutes);
router.use("/users", authenticateJWT, userRoutes);
router.use("/cart", authenticateJWT, cartRoutes);

module.exports = router;
