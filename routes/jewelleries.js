const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify');

// INDEX - ALL PRODUCTS
router.get("/", catchAsync(async (req, res) => {
    // Fetch all products from shopify
    let products = await shopify.getAllProducts() || [];
    // console.log(products);

    res.render("jewellery/index", { products, type: "all-products" });
}));

// INDEX - COLLECTIONS
router.get("/collections/:type", catchAsync(async (req, res) => {
    // get the jewellery type
    let type = req.params.type;
    // Fetch the correct collection from shopify based on type
    let products = await shopify.getCollection(type) || [];
    
    res.render("jewellery/index", { products, type });
}));

// SHOW PRODUCT
router.get('/show/:id', catchAsync(async (req, res) => {
    // Fetch the product from shopify based on the url
    let product = await shopify.getProduct(req.params.id) || [];
    // Get materials used from product description and the description without the materials
    let [materials, description] = await shopify.parseDescription(product.description, product.descriptionHtml) || [{}, product.descriptionHtml];
    // Get similar items from the same collection
    let similarItems = await shopify.getCollection(product.productType) || [];

    res.render('jewellery/show', { product, description, materials, similarItems });
}));

// ADD TO CART
router.post('/add-to-cart/:id', catchAsync(async (req, res) => {
    let productID = req.params.id;
    let checkoutID = req.session.checkoutID;
    let productAlreadyInCart = await shopify.isProductInCart(checkoutID, productID)
    // If the checkout id is not set on the session or the item is already in the cart then return
    if (!checkoutID || productAlreadyInCart) {
        // Do not add the item and redirect to the jewellery page with the cart open
        // ADD MESSAGE TO THIS LATER
        res.redirect(`/jewellery/show/${productID}/?cart=true`);
        return;
    }
    // Add the product to the correct checkout
    else await shopify.addLineItem(checkoutID, productID);

    // Redirect to the jewellery page with the cart open
    res.redirect(`/jewellery/show/${productID}/?cart=true`);
}));

module.exports = router;