const { verifyToken } = require("../helpers/jwt");

module.exports = function auth(req, res, next) {
    try {
        const { accessToken } = req.headers;

        req.loggedInUser = verifyToken(accessToken);

        next();
    } catch (error) {
        next(error);
    }
};
