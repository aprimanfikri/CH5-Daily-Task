require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("../routes");
const path = require("path");
const ApiError = require("../utils/apiError");
const errorHandler = require("../controllers/errorController");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(morgan("dev"));

app.use(router);

app.all("*", (req, res, next) => {
  next(new ApiError(404, `Route ${req.params[0]} not found`));
});

app.use(errorHandler);

module.exports = app;
