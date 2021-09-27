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

Order.getOrderIdForCartDisplay = async (userIdFrontEnd) => {
  const isCart = await Order.findAll({
    where: { isPaid: false, userId: userIdFrontEnd },
  });

  if (isCart.length === 0) {
    return null;
  } else {
    return isCart[0].id;
  }
};

Order.getOrderIdForAddToCart = async (userIdFrontEnd) => {
  const isCart = await Order.findAll({
    where: { isPaid: false, userId: userIdFrontEnd },
  });

  if (isCart.length === 0) {
    const newCart = await Order.create({
      isPaid: false,
      orderAddress: "a",
      totalPrice: 0,
      userId: userIdFrontEnd,
    });
    return newCart.id;
  } else {
    return isCart[0].id;
  }
};

module.exports = Order;
