const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { linkSchema } = require('../schemas.js');
const { isLoggedIn, isLinkAuthor, validateLink } = require('../middleware');
const shopify = require('../shopify');

const Link = require('../models/link');

let session;

// INDEX
router.get("/", catchAsync(async (req, res) => {
    const links = await Link.find({});
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};
    res.render("links/index", { links, cart, showCart: false });
}));

// NEW
router.get("/new", isLoggedIn, catchAsync( async (req, res) => {
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};
    res.render("links/new", { cart, showCart: false });
}));

router.post("/", isLoggedIn, validateLink, catchAsync(async (req, res) => {
    // if (!req.body.link) throw new ExpressError('Invalid Link Data', 400);
    const link = new Link(req.body.link);
    link.author = req.user._id;
    await link.save();
    req.flash('success', 'Successfully added a new link!');
    res.redirect("/links");
}));

// EDIT 
router.get('/:id/edit', isLoggedIn, isLinkAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const link = await Link.findById(id);
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};
    if (!link) {
        req.flash("error", "Cannot find that link");
        return res.redirect("/links")
    }
    res.render('links/edit', { link, cart, showCart: false });
}));

router.put('/:id', isLoggedIn, validateLink, isLinkAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const link = await Link.findByIdAndUpdate(id, { ...req.body.link });
    req.flash("success", "Successfully updated link!");
    res.redirect("/links")
}));

// DELETE
router.delete('/:id', isLoggedIn, isLinkAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Link.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted link!");
    res.redirect('/links');
}));

module.exports = router;