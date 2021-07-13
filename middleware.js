const { blogSchema, linkSchema, emailSchema, customJewellerySchema, treatmentSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Blog = require('./models/blog');
const Link = require('./models/link');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateBlog = (req, res, next) => {
    const { error } = blogSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateEmail = (req, res, next) => {
    const { error } = emailSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateCustomJewellery = (req, res, next) => {
    // If the product is not a custom item then move on
    if (!req.body.custom) return next();
    // Else test for an error
    const { error } = customJewellerySchema.validate(req.body, {allowUnknown: true});
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateTreatment = (req, res, next) => {
    // Else test for an error
    const { error } = treatmentSchema.validate(req.body, {allowUnknown: true});
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateLink = (req, res, next) => {
    const { error } = linkSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isBlogAuthor = async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/blogs/${id}`);
    }
    next();
}

module.exports.isLinkAuthor = async (req, res, next) => {
    const { id } = req.params;
    const link = await Link.findById(id);
    if (!link.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect("/links");
    }
    next();
}