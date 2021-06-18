const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify');


// JEWELLERY ROUTES
// INDEX
router.get("/", catchAsync(async (req, res) => {
    // Fetch all products from shopify
    let products = await shopify.getAllProducts || [];

    res.render("jewellery/index", { products, type: "all-products" });
}));

router.get("/collections/:type", catchAsync(async (req, res) => {
    let type = req.params.type;
    // Fetch the correct collection from shopify based on type
    let products = await shopify.getCollection(type) || [];
    
    res.render("jewellery/index", { products, type });
}));

// SHOW TEMPLATE
router.get('/show/:id', catchAsync(async (req, res,) => {
    let productID = req.params.id;
    // Fetch the product from shopify
    let product = await shopify.getProduct(productID) || [];
    // Get materials used from product description and the description without the materials
    let [materials, description] = await shopify.parseDescription(product.description, product.descriptionHtml) || [{}, product.descriptionHtml];
    // Get similar items from the same collection
    let similarItems = await shopify.getCollection(product.productType) || [];

    res.render('jewellery/show', { product, description, materials, similarItems });
}));


module.exports = router;