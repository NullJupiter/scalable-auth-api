const Joi = require('@hapi/joi');

// register validation
const registerValidation = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(8).max(255).required()
});

const loginValidation = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(8).max(255).required()
});

module.exports = { registerValidation, loginValidation };