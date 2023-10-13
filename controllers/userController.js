const { User, Shop } = require("../models");
const ApiError = require("../utils/apiError");

const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Shop,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    res.status(200).json({
      status: "success",
      message: "Get all users success",
      data: users,
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports = { getAll };
