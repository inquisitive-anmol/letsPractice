const validateEnv = require("./validateEnv");

validateEnv();

const config = {
    app: {
        env: process.env.NODE_ENV || "development",
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",
    },
    db: {
        uri: process.env.MONGODB_URI,
        options: {
            autoIndex: process.env.NODE_ENV !== "production",
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        },
    },

    // other configurations
};

module.exports = Object.freeze(config);
