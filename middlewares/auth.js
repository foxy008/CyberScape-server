const { verifyToken } = require("../helpers/jwt");

module.exports = function auth(req, res, next) {
    try {
        const { access_token } = req.headers;
        // console.log(access_token);
        
        req.loggedInUser = verifyToken(access_token);

        next();
    } catch (error) {
        next(error);
    }

}
