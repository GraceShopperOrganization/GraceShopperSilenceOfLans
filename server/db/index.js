//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/product");
const Order = require("./models/order");
const Order_detail = require("./models/orderDetails");

//associations could go here!
Order.belongsTo(User);
User.hasMany(Order);
//
Product.belongsToMany(Order, { through: Order_detail });
Order.belongsToMany(Product, { through: Order_detail });

module.exports = {
    db,
    models: {
        User,
        Product,
        Order,
        Order_detail
    }
};
