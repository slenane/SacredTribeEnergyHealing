const Joi = require("joi");

module.exports.blogSchema = Joi.object({
    blog: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        header: Joi.string().required(),
        text: Joi.string().required()
    }).required()
});