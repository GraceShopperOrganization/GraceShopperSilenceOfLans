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
      const newProduct = await Product.create(req.body);
      res.json(newProduct);
  } catch (err) {
      next(err);
  }
});

//PUT /api/product/:id
router.put("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const updatedProduct = await product.update(req.body);
    res.send(updatedProduct);
  } catch (err) {
    console.log("ERROR FROM PUT PRODUCT")
    next(err);
  }
});

//DELETE /api/product/:id
router.delete("/:id", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (err) {
    console.log("ERROR FROM DELETE PRODUCT")
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
