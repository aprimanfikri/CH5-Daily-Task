const ApiError = require("../utils/apiError");
const { Shop } = require("../models");

const checkOwnership = async (req, res, next) => {
  try {
    const shop = await Shop.findByPk(req.user.shopId);
    if (!shop) {
      throw new ApiError(404, "Shop not found");
    }
    if (shop.id === req.user.shopId) {
      next();
    } else {
      console.log(req.user.shopId);
      throw new ApiError(
        403,
        `You don't have permission to access this route, only the owner of ${shop.name} can access this route`
      );
    }
  } catch (error) {
    next(new ApiError(404, error.message));
  }
};

module.exports = checkOwnership;
