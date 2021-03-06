const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { isLoggedIn, isAdmin } = require("./gateKeepingMiddleware");

module.exports = router;

//GET /api/users
router.get("/", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "address", "email"],
    });
    res.json(users);
  } catch (err) {
    console.log("ERROR FROM THE ROUTE");
    next(err);
  }
});

// POST /api/users
router.post("/",async (req, res, next) => {
  try {
    const {firstName,lastName,email,password,address,username} = req.body
    res.status(201).send(await User.create({firstName,lastName,email,password,address,username}));
  } catch (err) {
    next(err);
  }
});
