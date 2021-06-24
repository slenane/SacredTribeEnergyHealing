const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isBlogAuthor, validateBlog } = require('../middleware');
const shopify = require('../shopify');
const Blog = require('../models/blog');

let session;

// INDEX
router.get("/", catchAsync(async (req, res) => {
    // Find all blogs
    const blogs = await Blog.find({});

    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};

    res.render("blogs/index", { blogs, cart, showCart: false });
}));

// NEW
router.get("/new", isLoggedIn, catchAsync(async(req, res) => {
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};

    res.render("blogs/new", { cart, showCart: false });
}));

router.post("/", isLoggedIn, validateBlog, catchAsync(async (req, res) => {
    // Create new blog instnace
    const blog = new Blog(req.body.blog);
    // Set the author
    blog.author = req.user._id;
    // Save the blog to the DB
    await blog.save();
    req.flash('success', 'Successfully made a new blog!');
    res.redirect(`/blogs/${blog._id}`)
}));

// SHOW
router.get('/:id', catchAsync(async (req, res,) => {
    // Find one blog
    const blog = await Blog.findById(req.params.id);
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};

    if (!blog) {
        req.flash("error", "Cannot find that blog");
        return res.redirect("/blogs")
    }
    res.render('blogs/show', { blog, cart, showCart: false });
}));

// EDIT 
router.get('/:id/edit', isLoggedIn, isBlogAuthor, catchAsync(async (req, res) => {
    // Find one blog by the id
    const { id } = req.params;
    const blog = await Blog.findById(id);
    // Fetch the cart, if it exists
    session = req.session;
    let cart = await shopify.getCart(session) || {};

    if (!blog) {
        req.flash("error", "Cannot find that blog");
        return res.redirect("/blogs")
    }
    res.render('blogs/edit', { blog, cart, showCart: false });
}));

router.put('/:id', isLoggedIn, validateBlog, isBlogAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, { ...req.body.blog });
    req.flash("success", "Successfully updated blog!");
    res.redirect(`/blogs/${blog._id}`)
}));

// DELETE
router.delete('/:id', isLoggedIn, isBlogAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted blog!");
    res.redirect('/blogs');
}));

module.exports = router;