const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Jewellery = require('../models/jewellery');

// TREATMENT ROUTES
// INDEX
router.get("/treatments", (req, res) => {
    res.render("sections/treatments/index");
});

// SHOW - ENERGY TREATMENT
router.get("/treatments/energy-treatment", (req, res) => {
    res.render("sections/treatments/energy-treatment/show");
});

// SHOW - ABSENTEE TREATMENT
router.get("/treatments/absentee-treatment", (req, res) => {
    res.render("sections/treatments/absentee-treatment/show");
});

// JEWELLERY ROUTES
// INDEX
router.get("/jewellery", catchAsync(async (req, res) => {
    const jewelleries = await Jewellery.find({}) || [];
    res.render("sections/jewellery/index", { jewelleries });
}));

// SHOW
// router.get('/jewellery/:id', catchAsync(async (req, res,) => {
//     const jewellery = await Jewellery.findById(req.params.id)
//     res.render('sections/jewellery/show', { jewellery });
// }));

// SHOW TEMPLATE
router.get('/jewellery/show', catchAsync(async (req, res,) => {
    res.render('sections/jewellery/show');
}));

// AWARENESS ROUTE
router.get("/awareness", (req, res) => {
    res.render("sections/awareness/index");
});

// ABOUT ROUTE
router.get("/about", (req, res) => {
    res.render("sections/about/index");
});

module.exports = router;