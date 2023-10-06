const imagekit = require("../lib/imageKit");
const { Product } = require("../models");

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
    const newProduct = await Product.create({
      name,
      price,
      stock,
      imageUrl: img.url,
    });
    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create product: " + error.message,
    });
  }
};

const findProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      status: "success",
      message: "List of products found successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to find products: " + error.message,
    });
  }
};

const findProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (product) {
      res.status(200).json({
        status: "success",
        message: "Product found successfully",
        data: product,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to find product: " + error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const updatedProduct = await Product.update(
      {
        name,
        price,
        stock,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updatedProduct[0] > 0) {
      res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update product: " + error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedProduct > 0) {
      res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
        data: deletedProduct,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete product: " + error.message,
    });
  }
};

module.exports = {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
