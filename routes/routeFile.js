const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Jewellery = require('../models/jewellery');

// TREATMENT ROUTES
// INDEX
router.get("/treatments", (req, res) => {
    res.render("treatments/index");
});

// SHOW - ENERGY TREATMENT
router.get("/treatments/energy-treatment", (req, res) => {
    res.render("treatments/energy-treatment/show");
});

// SHOW - ABSENTEE TREATMENT
router.get("/treatments/absentee-treatment", (req, res) => {
    res.render("treatments/absentee-treatment/show");
});

// AWARENESS ROUTE
router.get("/awareness", (req, res) => {
    res.render("awareness/index");
});

// ABOUT ROUTE
router.get("/about", (req, res) => {
    res.render("about/index");
});

module.exports = router;