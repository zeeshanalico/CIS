import Joi from 'joi';

const createCustomerSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            'string.base': 'Name should be a type of text',
            'string.empty': 'Name cannot be an empty field',
            'string.min': 'Name should have a minimum length of {#limit}',
            'string.max': 'Name should have a maximum length of {#limit}',
            'any.required': 'Name is a required field',
        }),
    
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.empty': 'Email cannot be an empty field',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is a required field',
        }),

    contact_info: Joi.string()
        .min(10)
        .max(15)
        .required()
        .messages({
            'string.base': 'Contact info should be a type of text',
            'string.empty': 'Contact info cannot be an empty field',
            'string.min': 'Contact info should have a minimum length of {#limit}',
            'string.max': 'Contact info should have a maximum length of {#limit}',
            'any.required': 'Contact info is a required field',
        }),

    // Add any other fields as necessary
});

export { createCustomerSchema };
