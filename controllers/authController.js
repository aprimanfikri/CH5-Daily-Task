const bcrypt = require("bcrypt");
const { Auth, User } = require("../models");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { name, email, password, confirmPassword, age, address } = req.body;
  try {
    const userExists = await Auth.findOne({ where: { email } });
    // validasi check email
    if (userExists) {
      return next(new ApiError(400, "Email already exist"));
    }
    // minimum password length
    const passwordLength = password.length <= 8;
    if (passwordLength) {
      return next(new ApiError(400, "Password must be more than 8 characters"));
    }
    // validasi check password
    if (password !== confirmPassword) {
      return next(new ApiError(400, "Password not match"));
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(password, 10);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, 10);
    const newUser = await User.create({
      name,
      age,
      address,
    });
    await Auth.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      userId: newUser.id,
    });
    res.status(201).json({
      status: "success",
      message: "Register success",
      data: {
        ...newUser.get({ plain: true }),
        email,
        hashedPassword,
        hashedConfirmPassword,
      },
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // validasi check email
    const user = await Auth.findOne({ where: { email }, include: ["User"] });
    if (!user) {
      return next(new ApiError(400, "Email not found"));
    }
    // validasi check password
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return next(new ApiError(400, "Password wrong"));
    }
    console.log(user.email);
    const token = jwt.sign(
      {
        id: user.userId,
        email: user.email,
        role: user.User.role,
        name: user.User.name,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      status: "success",
      message: "Login success",
      data: {
        token,
      },
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

module.exports = { register, login };
