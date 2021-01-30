const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { blogSchema } = require('../schemas.js');
const { isLoggedIn } = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const Blog = require('../models/blog');

// VALIDATION
const validateBlog = (req, res, next) => {
    const { error } = blogSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// BLOG ROUTES
// INDEX
router.get("/", catchAsync(async (req, res) => {
    const blogs = await Blog.find({});
    res.render("sections/blogs/index", { blogs });
}));

// NEW
router.get("/new", (req, res) => {
    res.render("sections/blogs/new");
});

router.post("/", isLoggedIn, validateBlog, catchAsync(async (req, res) => {
    // if (!req.body.blog) throw new ExpressError('Invalid Blog Data', 400);
    const blog = new Blog(req.body.blog);
    await blog.save();
    res.redirect(`/blogs/${blog._id}`)
}));

// SHOW
router.get('/:id', catchAsync(async (req, res,) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        req.flash("error", "Cannot find that blog");
        return res.redirect("/blogs")
    }
    res.render('sections/blogs/show', { blog });
}));

// EDIT 
router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        req.flash("error", "Cannot find that blog");
        return res.redirect("/blogs")
    }
    res.render('sections/blogs/edit', { blog });
}));

router.put('/:id', isLoggedIn, validateBlog, catchAsync(async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, { ...req.body.blog });
    req.flash("success", "Successfully updated blog!");
    res.redirect(`/blogs/${blog._id}`)
}));

// DELETE
router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted blog!");
    res.redirect('/blogs');
}));

module.exports = router;