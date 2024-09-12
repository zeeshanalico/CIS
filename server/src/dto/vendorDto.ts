import Joi from 'joi';
export const createVendorSchema = Joi.object({
    name: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'Name should be a type of string',
            'string.empty': 'Name cannot be an empty field',
            'string.max': 'Name cannot exceed 255 characters',
            'any.required': 'Name is required',
        }),
        contact_info: Joi.string().optional().messages({
            'string.base': 'Contact Info should be a type of string',
        })
})