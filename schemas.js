const Joi = require("joi");

module.exports.blogSchema = Joi.object({
    blog: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        header: Joi.string().required(),
        text: Joi.string().required()
    }).required()
});

module.exports.linkSchema = Joi.object({
    link: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        imagePos: Joi.string().required(),
        text: Joi.string().required(),
        link: Joi.string().required()
    }).required()
});

module.exports.emailSchema = Joi.object({
    email: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        subject: Joi.string().required(),
        message: Joi.string().required()
    }).required()
});