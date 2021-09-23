const router = require("express").Router();

const Product = require("../db/models/product");
const Orders = require("../db/models/order");
const Order_detail = require("../db/models/orderDetails");

// POST /api/cart
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Order_detail.create(req.body));
    //   const price = await Product.
    // const products = await Product.findAll();
    // console.log("GET /PRODUCTS > ", products);
    // if (!products) {
    //     next({ status: 500, message: "Database query failed." });
    // }
    // res.json(products);
  } catch (err) {
    console.log(">  /api/products ERR: ", err);
    next(err);
  }
});

module.exports = router;
