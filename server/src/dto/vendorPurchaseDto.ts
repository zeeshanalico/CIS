import Joi from 'joi';

const createVendorPurchaseSchema = Joi.object({
    vendorId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Vendor ID must be a number',
            'number.integer': 'Vendor ID must be an integer',
            'number.positive': 'Vendor ID must be a positive number',
            'any.required': 'Vendor ID is required',
        }),
    
    productId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Product ID must be a number',
            'number.integer': 'Product ID must be an integer',
            'number.positive': 'Product ID must be a positive number',
            'any.required': 'Product ID is required',
        }),
    
    qty: Joi.number()
        .integer()
        .positive()
        .min(1)
        .required()
        .messages({
            'number.base': 'Quantity must be a number',
            'number.integer': 'Quantity must be an integer',
            'number.positive': 'Quantity must be a positive number',
            'number.min': 'Quantity must be at least 1',
            'any.required': 'Quantity is required',
        }),
    
    cost_price: Joi.number()
        .precision(2)
        .positive()
        .required()
        .messages({
            'number.base': 'Cost price must be a number',
            'number.positive': 'Cost price must be a positive number',
            'any.required': 'Cost price is required',
        }),
    
    // purchase_date: Joi.date()
    //     .required()
    //     .messages({
    //         'date.base': 'Purchase date must be a valid date',
    //         'any.required': 'Purchase date is required',
    //     }),
    
    // description: Joi.string()
    //     .allow('', null)
    //     .max(500)
    //     .messages({
    //         'string.max': 'Description must be at most 500 characters',
    //     })
});

export default createVendorPurchaseSchema;
