const jwt = require("jsonwebtoken");

class TokenManager {
    static generateToken(payload, expiresIn = process.env.JWT_EXPIRES_IN) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    }

    static generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }

    static verifyRefreshToken(token) {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
}

module.exports = TokenManager;