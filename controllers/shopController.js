const { Shop, User, Product } = require("../models");
const ApiError = require("../utils/apiError");

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    const shop = await Shop.create({ name, userId });
    res.status(201).json({
      status: "success",
      message: "Create shop success",
      data: shop,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

const update = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const shop = await Shop.update({ name }, { where: { id } });
    res.status(200).json({
      status: "success",
      message: "Update shop success",
      data: shop,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findByPk(id);
    res.status(200).json({
      status: "success",
      message: "Get one shop success",
      data: shop,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

const getAll = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Product,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    res.status(200).json({
      status: "success",
      message: "Get all shops success",
      data: shops,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shop = await Shop.destroy({ where: { id } });
    res.status(200).json({
      status: "success",
      message: "Delete shop success",
      data: shop,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports = {
  create,
  update,
  getOne,
  getAll,
  remove,
};
