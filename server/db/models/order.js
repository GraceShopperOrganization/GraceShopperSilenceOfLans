const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  isPaid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  orderAddress: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Order.getOrderIdForAddToCart = async (userIdFrontEnd) => {
  const isCart = await Order.findAll({
    where: { isPaid: false, userId: userIdFrontEnd },
  });

  if (!isCart) {
    const newCart = await Order.create({
      isPaid: false,
      orderAddress: "a",
      totalPrice: 0,
      userId: userIdFrontEnd,
    });
    return newCart.id;
  } else {
    return isCart.id;
  }
};

module.exports = Order;
