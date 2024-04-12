// middleware/auth.js
const passport = require("passport");

const authenticateJWT = passport.authenticate("jwt", { session: false });

const authorizeRole = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    return next();
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = {
  authenticateJWT,
  authorizeRole,
};
