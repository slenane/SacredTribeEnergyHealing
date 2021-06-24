const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify');

let session;

// HOME ROUTE
router.get("/", catchAsync(async (req, res) => {
    // Fetch all featured products from shopify
    let [featuredItems, featuredImages] =  await shopify.getFeaturedProducts() || [{}, []];

    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};

    res.render("index", { featuredItems, featuredImages, cart, showCart: false });
}));

// AWARENESS ROUTE
router.get("/awareness", catchAsync(async (req, res) => {
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};
    res.render("awareness/index", { cart, showCart: false });
}));

// ABOUT ROUTE
router.get("/about", catchAsync(async (req, res) => {
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};
    res.render("about/index", { cart, showCart: false });
}));

module.exports = router;