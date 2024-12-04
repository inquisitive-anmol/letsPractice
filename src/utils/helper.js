class Helpers {
    static formatResponse(success, message, data = null) {
        return {
            success,
            message,
            data
        }
    }

  static paginateResults(page, limit) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    return { skip, limit: limitNumber };
  }

  static sanitizeUser(user) {
    const {password, __v, ...sanitizedUser} = user.toObject();
    return sanitizedUser;
  }


  static generateRandomString(length) {
    return crypto.randomBytes(40).toString("hex");
  }
}

module.exports = Helpers;
