const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { validateTreatment } = require('../middleware');
const shopify = require('../shopify');

// TREATMENT ROUTES
// INDEX
router.get("/", catchAsync(async (req, res) => {
    res.render("treatments/index", { title: "Treatments" });
}));

// NEW
router.get("/:type", catchAsync(async (req, res) => {
    let treatment;
    if (req.params.type === "energy-treatment") treatment = await shopify.getTreatment("Energy Treatment"); 
    else  treatment = await shopify.getTreatment("Absentee Treatment");
    // Set the title of the page
    let title = treatment.title === "Energy Treatment" ? "Energy Treatment" : "Absentee Treatment"; 

    res.render("treatments/new",  { treatment, title });
}));

// ADD TO CART 
router.post("/add-to-cart/:id", validateTreatment, catchAsync(async (req, res) => {
    // Get the URL to return to after deletion
    let backURL = req.header('Referer') || '/';
    let cartRegex = /\/\?cart=true/;
    let index = backURL.match(cartRegex)?.index;
    if (index) backURL = backURL.slice(0, index);

    let productID = req.params.id;
    let checkoutID = req.session.checkoutID;
    let options = req.body.treatment;
    let productAlreadyInCart = await shopify.isProductInCart(checkoutID, productID);
    // If the checkout id is not set on the session or the item is already in the cart then return
    if (!checkoutID || productAlreadyInCart || !options) {
        // Do not add the item and redirect to the jewellery page with the cart open
        return res.redirect(backURL + "/?cart=true" + "#treatment-options");
    }
    // Add the product to the correct checkout
    else await shopify.addTreatmentLineItem(checkoutID, productID, options);

    let lineItem = await shopify.getLineItem(checkoutID, productID) || []; 

    // Redirect to the page the user came from with the cart still open
    return res.redirect(`/treatments/show/${lineItem.id}/?cart=true`);
}));

// SHOW 
router.get("/show/:id", catchAsync(async (req, res) => {
    let lineItemID = req.params.id;
    let checkoutID = req.session.checkoutID;
    // Get the treatment information
    let treatment = await shopify.getCustomItem(checkoutID, lineItemID) || [];
    // Set the title of the page
    let title = treatment.title === "Energy Treatment" ? "Energy Treatment" : "Absentee Treatment"; 

    res.render("treatments/show",  { treatment, title });
}));

// EDIT CUSTOM PRODUCT
router.get('/:id/edit', catchAsync(async (req, res) => {
    let lineItemID = req.params.id;
    let checkoutID = req.session.checkoutID;
    // Get the custom jewellery from all products
    let treatment = await shopify.getCustomItem(checkoutID, lineItemID) || [];
    // Set the title of the page
    let title = treatment.title === "Energy Treatment" ? "Energy Treatment" : "Absentee Treatment"; 

    res.render("treatments/edit", { title, treatment });
}));

// UPDATE LINE ITEM
router.post('/update-cart/:id', validateTreatment, catchAsync(async (req, res) => {
    let lineItemID = req.params.id;
    let checkoutID = req.session.checkoutID;
    let options = req.body.treatment;
    let lineItemIDs = await shopify.getLineItemIDs(checkoutID);

    // Update the item
    let lineItems = await shopify.updateTreatmentLineItem(checkoutID, lineItemID, options);
    
    // If the product had updated enough to change the lineItemID then find the ID that is not in the lineItemIDs array
    for (let item of lineItems) {
        if (lineItemIDs.indexOf(item.id) === -1) lineItemID = item.id
    }

    return res.redirect(`/treatments/show/${lineItemID}?cart=true`);
}));

module.exports = router;