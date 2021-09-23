const Sequelize = require("sequelize");
const db = require("../db");

const Order_detail = db.define("order_detail", {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    price: {
        type: Sequelize.INTEGER
    }
});
module.exports = Order_detail;
