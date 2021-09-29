const {
  models: { User },
} = require("../db");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).send("Admin only");
  } else {
    next();
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
};

