const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const shopify = require('../shopify');

router.get("/", catchAsync(async (req, res) => {
    // Fetch all featured products from shopify
    let [featuredItems, featuredImages] =  await shopify.getFeaturedProducts() || [{}, []];

    res.render("home", { featuredItems, featuredImages });
}));

module.exports = router;