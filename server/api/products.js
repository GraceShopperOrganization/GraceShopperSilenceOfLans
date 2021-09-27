const router = require("express").Router();
const {
    models: { Product }
} = require("../db");

// GET /api/products
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.findAll();
        // console.log("GET /PRODUCTS > ", products);
        // if (!products) {
        //     next({ status: 500, message: "Database query failed." });
        // }
        res.json(products);
    } catch (err) {
        console.log("> GET /api/products ERR: ", err);
        next(err);
    }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const singleProduct = await Product.findByPk(id);
        // console.log("GET SINGLE_PRODUCT > ", singleProduct);
        res.json(singleProduct);
    } catch (err) {
        console.log("> GET /api/products/:ID ERR: ", err);
        next(err);
    }
});

// POST /api/products/
router.post("/", async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (err) {
        next(err);
    }
});
module.exports = router;
