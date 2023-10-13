const jwt = require("jsonwebtoken");
const { Auth, User } = require("../models");
const ApiError = require("../utils/apiError");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return next(
        new ApiError(403, "Token not found. Please provide a valid token.")
      );
    }
    const token = bearerToken.split("Bearer ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.id, {
      include: ["Auth"],
    });
    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(403, error.message));
  }
};
