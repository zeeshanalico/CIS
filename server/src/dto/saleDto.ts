import Joi from 'joi';

export const cartSchema = Joi.object({
    cartProducts: Joi.array()
        .items(
            Joi.object({
                product_id: Joi.number().integer().required().messages({
                    'number.base': 'Product ID must be a number',
                    'any.required': 'Product ID are required',
                }),
                // name: Joi.string().required(),
                units: Joi.number().integer().min(1).required().messages({
                    'number.base': 'Units must be a number',
                    'number.min': 'Units must be at least 1',
                    'any.required': 'Units are required',
                }),
                // sale_price: Joi.number().positive().required().messages({
                //     'number.base': 'Sale price must be a valid number',
                //     'number.positive': 'Sale price must be greater than 0',
                //     'any.required': 'Sale price is required',
                // }),
                // quantity: Joi.number().integer().min(0).required().messages({
                //     'number.base': 'Quantity must be a valid number',
                //     'number.min': 'Quantity cannot be less than 0',
                //     'any.required': 'Quantity is required',
                // }),
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
        .max(Joi.ref('subtotal')) // subtotal should be dynamically calculated
        .messages({
            'number.min': 'Discount cannot be negative',
            'number.max': 'Discount cannot exceed the subtotal',
        }),

    customer: Joi.object({
        customer_id: Joi.number().integer().required().messages({
            'number.base': 'Customer ID must be a number',
            'any.required': 'Customer Selection is required',
        }),
    })
});
