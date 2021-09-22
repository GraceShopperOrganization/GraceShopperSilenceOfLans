const router = require("express").Router();
module.exports = router;

const productsRouter = require("./products");
const usersRouter = require("./users");

router.use("/users", usersRouter);
router.use("/products", productsRouter);
// router.use("/users", require("./users"));
// router.use("/products", require("./products"));

router.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
