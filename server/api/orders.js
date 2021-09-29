const router = require("express").Router();
const {
    models: { Order, Order_detail, Product }
} = require("../db");

const { isLoggedIn } = require("./gateKeepingMiddleware");

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
                where: { orderId: orderIdFromDb }
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
        const orderIdFromDb = await Order.getOrderIdForAddToCart(
            req.params.userId
        );

        await Order_detail.create({
            quantity: 1,
            price: null,
            productId: req.params.productId,
            orderId: orderIdFromDb
        });
        const cartItems = await Order_detail.findAll({
            where: { orderId: orderIdFromDb }
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
        const orderIdFromDb = await Order.getOrderIdForAddToCart(
            req.params.userId
        );

        await Order_detail.update(
            { quantity: req.body.quantity },
            {
                where: {
                    productId: req.params.productId,
                    orderId: orderIdFromDb
                }
            }
        );

        const cartItems = await Order_detail.findAll({
            where: { orderId: orderIdFromDb }
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
            where: {
                productId: req.params.productId,
                orderId: orderIdFromDb
            }
        });

        const cartItems = await Order_detail.findAll({
            where: { orderId: orderIdFromDb }
        });

        res.json(cartItems);
    } catch (err) {
        console.log("> POST /api/orders ERR: ", err);
        next(err);
    }
});

//creates order line item (unlogged user places the order)
//creates order details line item (unlogged user places the order)

router.post("/cart/placeOrderUnlogged", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    const orderList = req.body.order;

    const order = await Order.create({
      isPaid: true,
      orderAddress: "a",
      totalPrice: 0,
      userId: null,
      orderIdForClient: req.body.orderForClient,
    });

    let total = 0;

    orderList.map(async (orderItem) => {
      let price = 0;
      for (let i = 0; i < products.length; i++) {
        if (orderItem.productId === products[i].id) {
          price = products[i].price;
        }
      }
      const subtotal = orderItem.quantity * price;
      total += subtotal;

      await Order_detail.create({
        quantity: orderItem.quantity,
        price: subtotal,
        productId: orderItem.productId,
        orderId: order.dataValues.id,
      });
    });

    await Order.update(
      { totalPrice: total },
      {
        where: {
          orderIdForClient: req.body.orderForClient,
        },
      }
    );

    res.json([]);
  } catch (err) {
    console.log("> POST /api/orders ERR: ", err);
    next(err);
  }
})

router.put("/cart/:userId", async (req, res, next) => {
    try {
        let cart = req.body.cart
        const products = await Product.findAll()
        let totalPrice = 0

        const cartItems = cart.map(cartItem => {
            let product = products.find(
              (item) => item.id === cartItem.productId
            )
            cartItem.price = product.price;
            totalPrice += cartItem.price * cartItem.quantity
            return cartItem
        })

        const updatedItems = cartItems.map(async item => {
            return await Order_detail.update(
                { price: item.price },
                {
                    where: { productId: item.productId }
                }
            )
        })

        await Order.update(
            { totalPrice: totalPrice, isPaid: true, orderIdForClient: req.body.orderForClient },
            {
                where: { userId: req.params.userId, isPaid: false }
            })

        res.json(await Promise.all(updatedItems));
    } catch (err) {
        console.log("> POST /api/orders ERR: ", err);
        next(err);
    }
});

//updates order line item (logged user places the order)
//updates order details line item (logged user places the order)

module.exports = router;
