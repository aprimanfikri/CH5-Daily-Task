const { Product } = require("../models");
const imagekit = require("../lib/imageKit");

const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const file = req.file;
  try {
    const split = file.originalname.split(".");
    const extension = split[split.length - 1];
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });
    await Product.create({
      name,
      price,
      stock,
      imageUrl: img.url,
    });
    res.redirect("/admin/dashboard");
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create product: " + error.message,
    });
  }
};

const createPage = async (req, res) => {
  res.render("create");
};

const dashboardPage = async (req, res) => {
  const products = await Product.findAll();
  res.render("index", { products });
};

module.exports = { createProduct, createPage, dashboardPage };
