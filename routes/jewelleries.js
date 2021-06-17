const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify');


// JEWELLERY ROUTES
// INDEX
router.get("/", catchAsync(async (req, res) => {
    // Fetch all products from shopify
    let products = await shopify.getAllProducts || [];
    let type = "all-products";

    res.render("jewellery/index-shopify", { products, type });
}));

router.get("/collections/:type", catchAsync(async (req, res) => {
    let type = req.params.type;
    // Fetch the correct collection from shopify based on type
    let products = await shopify.getCollection(type) || [];

    res.render("jewellery/index-shopify", { products, type });
}));

// SHOW TEMPLATE
router.get('/show/:id', catchAsync(async (req, res,) => {
    let productID = req.params.id;
    // Fetch the product from shopify
    let product = await shopify.getProduct(productID) || [];

    res.render('jewellery/show-shopify1', { product });
}));


module.exports = router;