const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify');

// TREATMENT ROUTES
// INDEX
router.get("/", catchAsync(async (req, res) => {
    res.render("treatments/index");
}));

// SHOW - ENERGY TREATMENT
router.get("/energy-treatment", catchAsync(async (req, res) => {
    let treatment = await shopify.getTreatment("Energy Treatment");
    res.render("treatments/energy-treatment/show", { treatment });
}));

// SHOW - ABSENTEE TREATMENT
router.get("/absentee-treatment", catchAsync(async (req, res) => {
    let treatment = await shopify.getTreatment("Absentee Treatment");
    res.render("treatments/absentee-treatment/show", { treatment });
}));

// ADD TO CART 
router.post("/add-to-cart/:id", catchAsync(async (req, res) => {
    // Get the URL to return to after deletion
    let backURL = req.header('Referer') || '/';
    let cartRegex = /\/\?cart=true/;
    let index = backURL.match(cartRegex)?.index;
    if (index) backURL = backURL.slice(0, index);

    let productID = req.params.id;
    let checkoutID = req.session.checkoutID;
    let productAlreadyInCart = await shopify.isProductInCart(checkoutID, productID)
    // If the checkout id is not set on the session or the item is already in the cart then return
    if (!checkoutID || productAlreadyInCart) {
        // Do not add the item and redirect to the jewellery page with the cart open
        return res.redirect(backURL + "/?cart=true" + "#treatment-options");
    }
    // Add the product to the correct checkout
    else await shopify.addLineItem(checkoutID, productID);

    // Redirect to the page the user came from with the cart still open
    return res.redirect(backURL + "/?cart=true" + "#treatment-options");
}));

module.exports = router;