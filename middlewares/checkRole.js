const ApiError = require("../utils/apiError");

const checkRole = (role) => {
  return (req, res, next) => {
    try {
      if (req.user.role !== role) {
        return next(
          new ApiError(
            403,
            `You don't have permission to access this route, only ${role} can access this route`
          )
        );
      }
      next();
    } catch (error) {
      next(new ApiError(401, error.message));
    }
  };
};

module.exports = checkRole;
