const User = require("../db/models/User");

const loggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log("MIDDLEWARE TOKEN > ", token);

        const user = await User.findByToken(token);
        console.log("MIDDLEWARE USER > ", user);
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = loggedIn;
