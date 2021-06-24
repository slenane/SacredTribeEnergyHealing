const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify');

let session;

// TREATMENT ROUTES
// INDEX
router.get("/", catchAsync(async (req, res) => {
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};
    res.render("treatments/index", { cart, showCart: false });
}));

// SHOW - ENERGY TREATMENT
router.get("/energy-treatment", catchAsync(async (req, res) => {
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};
    res.render("treatments/energy-treatment/show", { cart, showCart: false });
}));

// SHOW - ABSENTEE TREATMENT
router.get("/absentee-treatment", catchAsync(async (req, res) => {
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};
    res.render("treatments/absentee-treatment/show", { cart, showCart: false });
}));

module.exports = router;