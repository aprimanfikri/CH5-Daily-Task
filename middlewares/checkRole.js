const ApiError = require("../utils/apiError");

const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user.role !== role) {
        next(new ApiError(401, `You are not authorized to access this route.`));
      }
      next();
    } catch (error) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;
