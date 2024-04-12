if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const passport = require("./config/passport");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/uploads", express.static("uploads/"));

app.use(routes);

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  if (err.message.includes("not found")) {
    res.status(404).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
});
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on port http://localhost:${PORT}`)
  );
});
