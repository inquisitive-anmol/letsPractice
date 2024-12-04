const { AppError } = require("./errorHandler");
const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
    throw new AppError(errors.array()[0].msg, 400);
  }
  next();
};

module.exports = validateRequest;