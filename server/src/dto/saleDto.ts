import Joi from 'joi';

export const cartSchema = Joi.object({
    cartProducts: Joi.array()
        .items(
            Joi.object({
                product_id: Joi.number().integer().required().messages({
                    'number.base': 'Product ID must be a valid number',
                    'any.required': 'Product ID is required',
                }),
                units: Joi.number().integer().min(1).required().messages({
                    'number.base': 'Units must be a valid number',
                    'number.min': 'Units must be at least 1',
                    'any.required': 'Units are required',
                }),
                unit_price: Joi.number()
                    .integer()
                    .required()
                    .messages({
                        'number.base': 'Unit Price must be a valid number',
                        'number.positive': 'Unit Price must be greater than zero',
                        'any.required': 'Unit Price is required',
                    }),
            })
        )
        .min(1)
        .required()
        .messages({
            'array.base': 'Cart products must be a valid array',
            'array.min': 'There must be at least one product in the cart',
            'any.required': 'Cart products are required',
        }),

    discount: Joi.number()
        .min(0)
        .max(Joi.ref('subtotal')) // Ensure discount doesn't exceed subtotal
        .required()
        .messages({
            'number.base': 'Discount must be a valid number',
            'number.min': 'Discount cannot be negative',
            'number.max': 'Discount cannot exceed the subtotal',
            'any.required': 'Discount is required',
        }),

    customer_id: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'Customer ID must be a valid number',
            'any.required': 'Customer selection is required',
        }),

    subtotal: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Subtotal must be a valid number',
            'number.positive': 'Subtotal must be greater than zero',
            'any.required': 'Subtotal is required',
        }),

    total: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Total must be a valid number',
            'number.positive': 'Total must be greater than zero',
            'any.required': 'Total is required',
        }),
});
