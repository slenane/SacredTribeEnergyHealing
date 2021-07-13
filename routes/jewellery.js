const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { validateCustomJewellery } = require('../middleware');
const shopify = require('../shopify');

// INDEX - ALL PRODUCTS
router.get("/", catchAsync(async (req, res) => {
    // Fetch all products from shopify
    let [products, custom] = await shopify.getAllProducts() || [];

    res.render("jewellery/index", { title: "Jewellery", type: "all-products", products, custom });
}));

// INDEX - COLLECTIONS
router.get("/collections/:type", catchAsync(async (req, res) => {
    // Get the jewellery type
    let type = req.params.type;
    // Fetch the correct collection from shopify based on type
    let products = await shopify.getCollection(type) || [];
    
    res.render("jewellery/index", { title: "Jewellery", products, type });
}));

// NEW CUSTOM PRODUCT
router.get('/custom', catchAsync(async (req, res) => {
    // Get the custom jewellery from all products (ignore the first return item because it is all products)
    let [, custom] = await shopify.getAllProducts() || [];

    res.render("jewellery/customItems/new", { title: "Custom Jewellery", custom });
}));

// SHOW CUSTOM PRODUCT
router.get('/custom/:id', catchAsync(async (req, res) => {
    let lineItemID = req.params.id;
    let checkoutID = req.session.checkoutID;
    // Get the custom jewellery from all products 
    let custom = await shopify.getCustomItem(checkoutID, lineItemID) || [];

    res.render("jewellery/customItems/show", { title: "Custom Jewellery", custom });
}));

// EDIT CUSTOM PRODUCT
router.get('/custom/:id/edit', catchAsync(async (req, res) => {
    let lineItemID = req.params.id;
    let checkoutID = req.session.checkoutID;
    // Get the custom jewellery from all products
    let custom = await shopify.getCustomItem(checkoutID, lineItemID) || [];

    res.render("jewellery/customItems/edit", { title: "Custom Jewellery", custom });
}));

// SHOW PRODUCT
router.get('/show/:id', catchAsync(async (req, res) => {
    let productID = req.params.id;
    let checkoutID = req.session.checkoutID;
    // Fetch the product from shopify based on the url
    let product = await shopify.getProduct(productID) || [];
    // If the product is already in the cart then get the lineItem
    let lineItem = await shopify.getLineItem(checkoutID, productID);
    // Get materials used from product description and the description without the materials
    let materials = await shopify.getMaterials(product.description) || {};
    // Get similar items from the same collection
    let similarItems = await shopify.getCollection(product.productType) || [];

    let jewellerySize;
    if (lineItem) {
       jewellerySize  = lineItem.customAttributes[0].value;
    }

    res.render('jewellery/show', { title: "Jewellery", product, jewellerySize, materials, similarItems });
}));

// ADD TO CART
router.post('/add-to-cart/:id', validateCustomJewellery, catchAsync(async (req, res) => {
    let productID = req.params.id;
    let checkoutID = req.session.checkoutID;
    let customOptions = req.body.custom;
    let jewelleryOptions = req.body.jewellery;
    let productAlreadyInCart = await shopify.isProductInCart(checkoutID, productID)
    // If the checkout id is not set on the session or the item is already in the cart then return
    if (!checkoutID || (productAlreadyInCart && !customOptions)) {
        // Do not add the item and redirect to the jewellery page with the cart open
        return res.redirect(`/jewellery/show/${productID}/?cart=true`);
    }
    else if (!checkoutID && customOptions) {
        // Do not add the item and redirect to the jewellery page with the cart open
        return res.redirect(`/jewellery/custom`);
    }
    // Add the product to the correct checkout
    else await shopify.addJewelleryLineItem(checkoutID, productID, jewelleryOptions, customOptions);
    
    if (customOptions) {
        let lineItem = await shopify.getLineItem(checkoutID, productID) || []; 
        return res.redirect(`/jewellery/custom/${lineItem.id}?cart=true`);
    } else {
        // Redirect to the jewellery page with the cart open
        res.redirect(`/jewellery/show/${productID}/?cart=true`);
    }
}));

// UPDATE LINE ITEM
router.post('/update-cart/:id', validateCustomJewellery, catchAsync(async (req, res) => {
    let lineItemID = req.params.id;
    let checkoutID = req.session.checkoutID;
    let customOptions = req.body.custom;
    let lineItemIDs = await shopify.getLineItemIDs(checkoutID);

    // Update the item
    let lineItems = await shopify.updateJewelleryLineItem(checkoutID, lineItemID, customOptions);
    
    // If the product had updated enough to change the lineItemID then find the ID that is not in the lineItemIDs array
    for (let item of lineItems) {
        if (lineItemIDs.indexOf(item.id) === -1) lineItemID = item.id
    }

    return res.redirect(`/jewellery/custom/${lineItemID}?cart=true`);
}));

module.exports = router;