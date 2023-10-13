const ApiError = require("../utils/apiError");
const { Shop } = require("../models");

const checkOwnership = async (req, res, next) => {
  try {
    const { user } = req;
    const { shopId } = req.params;
    const shop = await Shop.findByPk(shopId);
    if (!shop) {
      throw new ApiError(404, "Shop not found");
    }
    if (shop.userId === user.id) {
      next();
    } else {
      throw new ApiError(
        403,
        `You don't have permission to access this route, only the owner of ${shop.name} can access this route`
      );
    }
  } catch (error) {
    next(new ApiError(401, error.message));
  }
};

module.exports = checkOwnership;
