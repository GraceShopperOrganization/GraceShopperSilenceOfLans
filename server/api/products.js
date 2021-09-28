const router = require("express").Router();
const {
    models: { Product }
} = require("../db");
const { isLoggedIn, isAdmin } = require("./gateKeepingMiddleware");

// GET /api/products
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.log("> GET /api/products ERR: ", err);
        next(err);
    }
});

// POST /api/products/
router.post("/", async (req, res, next) => {
    try {
        const { productName, description, price, category, inventory } =
            req.body;

        const newProduct = await Product.create({
            productName,
            description,
            price,
            category,
            inventory
        });
        res.json(newProduct);
    } catch (err) {
        console.log("ERROR FROM POST /PRODUCT", err);
        next(err);
    }
});

// UPDATE /api/product/:id
router.put("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        const { productName, description, price, category, inventory } =
            req.body;

        const updatedProduct = await product.update({
            productName,
            description,
            price,
            category,
            inventory
        });
        res.send(updatedProduct);
    } catch (err) {
        console.log("ERROR FROM UPDATE /PRODUCT:ID", err);
        next(err);
    }
});

// DELETE /api/product/:id
router.delete("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        await product.destroy();
        res.send(product);
    } catch (err) {
        console.log("ERROR FROM DELETE /PRODUCT/:ID", err);
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
        console.log("ERROR FROM /PRODUCT:ID ", err);
        next(err);
    }
});

module.exports = router;
