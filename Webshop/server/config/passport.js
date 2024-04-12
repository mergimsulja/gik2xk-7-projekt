// config/passport.js
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { ExtractJwt } = passportJWT;
const { User } = require("../models");

const JWTStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.log("error", error)
      return done(error, false);
    }
  })
);

module.exports = passport;
