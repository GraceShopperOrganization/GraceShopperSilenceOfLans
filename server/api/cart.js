const router = require("express").Router();
const {
  models: { Orders, Order_details },
} = require("../db");

// POST /api/cart
router.post("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    // console.log("GET /PRODUCTS > ", products);
    // if (!products) {
    //     next({ status: 500, message: "Database query failed." });
    // }
    res.json(products);
  } catch (err) {
    console.log(">  /api/products ERR: ", err);
    next(err);
  }
});

module.exports = router;
