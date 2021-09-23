const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
    isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    orderAddress: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Order;
