const { body } = require("express-validator");

const createUserValidator = [
    body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address.'),
    body('password')
    .trim()
    .isLength({min: 8})
    .withMessage('Password must be at least 8 characters long.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.')
]

module.exports = { createUserValidator };