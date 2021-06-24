const express = require('express');
const router = express.Router();
const url = require('url');
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify');

let session;

// INDEX - ALL PRODUCTS
router.get("/", catchAsync(async (req, res) => {
    // Fetch all products from shopify
    let products = await shopify.getAllProducts || [];
    
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};

    res.render("jewellery/index", { products, showCart: false, cart, type: "all-products" });
}));

// INDEX - COLLECTIONS
router.get("/collections/:type", catchAsync(async (req, res) => {
    let type = req.params.type;
    // Fetch the correct collection from shopify based on type
    let products = await shopify.getCollection(type) || [];

    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};
    
    res.render("jewellery/index", { products, showCart: false, cart, type });
}));

// SHOW PRODUCT
router.get('/show/:id', catchAsync(async (req, res) => {
    let productID = req.params.id;
    let showCart = url.parse(req.url, true).query.cart === "true" ? true : false;
    
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};
    // Fetch the product from shopify
    let product = await shopify.getProduct(productID) || [];
    // Get materials used from product description and the description without the materials
    let [materials, description] = await shopify.parseDescription(product.description, product.descriptionHtml) || [{}, product.descriptionHtml];
    // Get similar items from the same collection
    let similarItems = await shopify.getCollection(product.productType) || [];

    res.render('jewellery/show', { product, showCart, cart, description, materials, similarItems });
}));

// ADD TO CART
router.post('/add-to-cart/:id', catchAsync(async (req, res) => {
    let productID = req.params.id;
    let checkoutID = session.checkoutID;
    // Once the checkout is generated - Add the line item
    if (!checkoutID) return;
    await shopify.addLineItem(checkoutID, productID);
    // Redirect to the jewellery page with the cart open
    res.redirect(`/jewellery/show/${productID}/?cart=true`);
}));

// REMOVE FROM CART
router.post('/remove-from-cart/:id', catchAsync(async (req, res) => {
    // Get the URL to return to after deletion
    let backURL = req.header('Referer') || '/';
    let productID = req.params.id;
    let checkoutID = session.checkoutID;
    if (!checkoutID) return;
    // remove the line item
    await shopify.removeLineItem(checkoutID, productID);
    res.redirect(backURL);
}));

module.exports = router;