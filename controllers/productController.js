const imagekit = require("../lib/imageKit");
const { Product } = require("../models");
const ApiError = require("../utils/apiError");

const createProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  let imageUrl;
  try {
    if (!name || !price || !stock) {
      throw new ApiError(400, "Incomplete product information");
    }
    const newProduct = await Product.create({
      name,
      price,
      stock,
    });
    if (req.file) {
      const split = req.file.originalname.split(".");
      const extension = split[split.length - 1];
      const img = await imagekit.upload({
        file: req.file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      imageUrl = img.url;
      newProduct.imageUrl = imageUrl;
      await newProduct.save();
    }
    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    next(new ApiError(500, "Failed to create product: " + error.message));
  }
};

const findProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      status: "success",
      message: "List of products found successfully",
      data: products,
    });
  } catch (error) {
    next(new ApiError(500, "Failed to find products: " + error.message));
  }
};

const findProductById = async (req, res, next) => {
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
      next(new ApiError(404, `Product with id ${req.params.id} not found`));
    }
  } catch (error) {
    next(new ApiError(500, "Failed to find product: " + error.message));
  }
};

const updateProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  let imageUrl;
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!product) {
      return next(
        new ApiError(404, `Product with id ${req.params.id} not found`)
      );
    }
    if (req.file) {
      const split = req.file.originalname.split(".");
      const extension = split[split.length - 1];
      const img = await imagekit.upload({
        file: req.file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      imageUrl = img.url;
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    if (imageUrl) {
      product.imageUrl = imageUrl;
    }
    await product.save();
    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(new ApiError(500, "Failed to update product: " + error.message));
  }
};

const deleteProduct = async (req, res, next) => {
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
      });
    } else {
      next(new ApiError(404, `Product with id ${req.params.id} not found`));
    }
  } catch (error) {
    next(new ApiError(500, "Failed to delete product: " + error.message));
  }
};

module.exports = {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
