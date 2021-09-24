const router = require("express").Router();
const {
  models: { Order, Order_detail, Product },
} = require("../db");

// GET /api/orders/
router.get("/", async (req, res, next) => {
  try {
    console.log(req.params);
    const orderId = await Order.findAll();

    // const orderId = await Order.getOrderIdForAddToCart(req.params.id);
    res.json(orderId);
  } catch (err) {
    console.log("> GET /api/orders ERR: ", err);
    next(err);
  }
});

module.exports = router;
