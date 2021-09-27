const router = require("express").Router();
const {
  models: { Order, Order_detail, Product },
} = require("../db");

// GET /api/orders/cart/:userId      returns cart for specific user
router.get("/cart/:userId", async (req, res, next) => {
  try {
    const orderIdFromDb = await Order.getOrderIdForCartDisplay(
      req.params.userId
    );

    let cartItems = [];

    if (orderIdFromDb === null) {
      cartItems = [];
    } else {
      cartItems = await Order_detail.findAll({
        where: { orderId: orderIdFromDb },
      });
    }

    res.json(cartItems);
  } catch (err) {
    console.log("> GET /cart/:userId ERR: ", err);
    next(err);
  }
});

// POST /api/orders/cart/:userId/:productId         adds item to cart (no such items in the cart)
router.post("/cart/:userId/:productId", async (req, res, next) => {
  try {
    const orderIdFromDb = await Order.getOrderIdForAddToCart(req.params.userId);

    await Order_detail.create({
      quantity: 1,
      price: null,
      productId: req.params.productId,
      orderId: orderIdFromDb,
    });
    const cartItems = await Order_detail.findAll({
      where: { orderId: orderIdFromDb },
    });

    res.json(cartItems);
  } catch (err) {
    console.log("> POST /api/orders ERR: ", err);
    next(err);
  }
});

// PUT /api/orders/cart/:userId/:productId         adds/removes item to/from cart (such item in the cart already exists)
router.put("/cart/:userId/:productId", async (req, res, next) => {
  try {
    const orderIdFromDb = await Order.getOrderIdForAddToCart(req.params.userId);

    await Order_detail.update(
      { quantity: req.body.quantity },
      { where: { productId: req.params.productId, orderId: orderIdFromDb } }
    );

    const cartItems = await Order_detail.findAll({
      where: { orderId: orderIdFromDb },
    });

    res.json(cartItems);
  } catch (err) {
    console.log("> POST /api/orders ERR: ", err);
    next(err);
  }
});

// DELETE /api/orders/cart/:userId/:productId         deletes item from cart (all quantity)

router.delete("/cart/:userId/:productId", async (req, res, next) => {
  try {
    const orderIdFromDb = await Order.getOrderIdForCartDisplay(
      req.params.userId
    );

    await Order_detail.destroy({
      where: { productId: req.params.productId, orderId: orderIdFromDb },
    });

    const cartItems = await Order_detail.findAll({
      where: { orderId: orderIdFromDb },
    });

    res.json(cartItems);
  } catch (err) {
    console.log("> POST /api/orders ERR: ", err);
    next(err);
  }
});

router.put("/cart/:userId", async (req, res, next) => {
  try {
    const orderIdFromDb = await Order.getOrderIdForCartDisplay(
      req.params.userId
    );

    //calculate the total price
    //update isPaid and totalPrice

    const cartItems = await Order_detail.findAll({
      where: { orderId: orderIdFromDb },
    });

    res.json(cartItems);
  } catch (err) {
    console.log("> POST /api/orders ERR: ", err);
    next(err);
  }
});

module.exports = router;
