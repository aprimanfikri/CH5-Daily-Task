require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("../routes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(morgan("dev"));

app.use(router);

module.exports = app;
