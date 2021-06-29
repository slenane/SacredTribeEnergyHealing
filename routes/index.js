const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify');


// HOME ROUTE
router.get("/", catchAsync(async (req, res) => {
    // Fetch all featured products from shopify
    let [featuredItems, featuredImages] =  await shopify.getFeaturedProducts() || [{}, []];

    res.render("index", { featuredItems, featuredImages });
}));

// AWARENESS ROUTE
router.get("/awareness", catchAsync(async (req, res) => {
    res.render("awareness/index");
}));

// ABOUT ROUTE
router.get("/about", catchAsync(async (req, res) => {
    res.render("about/index");
}));

// CART ROUTES
// REMOVE FROM CART
router.delete('/remove-from-cart/:id', catchAsync(async (req, res) => {
    let productID = req.params.id;
    // Get the URL to return to after deletion
    let backURL = req.header('Referer') || '/';
    let cartRegex = /\/\?cart=true/;
    let index = backURL.match(cartRegex)?.index;
    if (index) backURL = backURL.slice(0, index);
    // If the checkout id is not set on the session then return
    if (!req.session.checkoutID) return;
    // Remove the product from the correct checkout
    else await shopify.removeLineItem(req.session.checkoutID, productID);

    if (backURL.match("custom") && backURL.match(productID)) return res.redirect("/jewellery/?cart=true");
    // Redirect to the page the user came from with the cart still open
    res.redirect(backURL + "/?cart=true");
}));

module.exports = router;