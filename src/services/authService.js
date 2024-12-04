const { AppError } = require("../utils/errorHandler");
const TokenManager = require("../utils/tokenManager");
const Encryption = require("../utils/encryption");
const Helpers = require("../utils/helper");

class AuthService {
    static async signUp(userData) {
        const hashedPassword = await Encryption.hashPassword(userData.password);
        const user = await User.create({ ...userData, password: hashedPassword });
        return Helpers.sanitizeUser(user);

        const token = TokenManager.generateToken(user.id);
        return { user, token };
    }

    static async login(email, password ) {
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await Encryption.comparePassword(password, user.password))) throw new AppError("Invalid email or password", 401);

        const token = TokenManager.generateToken({ id: user._id });
        return { user, token };
    }

    static async resetPassword(token, newPassword) {
        const hashedToken = Encryption.createHash(token);
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) throw new AppError("Invalid or expired token", 400);

        const hashedPassword = await Encryption.hashPassword(newPassword);
        const updatedUser = await User.findByIdAndUpdate(user._id, { password: hashedPassword, passwordResetToken: null, passwordResetExpires: null });
        return Helpers.sanitizeUser(updatedUser);
    }

}

module.exports = AuthService;