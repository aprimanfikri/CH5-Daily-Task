const express = require("express");
const morgan = require("morgan");
const router = require("../routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(router);

module.exports = app;
