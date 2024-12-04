const jwt = require("jsonwebtoken");
const { AppError } = require("./errorHandler");
const TokenManager = require("../utils/tokenManager");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new AppError(
        "You are not logged in. Please log in to get access.",
        401
      );
    }

    const decoded = await TokenManager.verifyToken(token);

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError(
        "The user belonging to this token does no longer exist.",
        401
      );
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { protect };
