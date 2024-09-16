import Joi from 'joi'
export const createProductSchema = Joi.object({
      name: Joi.alternatives().try(Joi.string().max(255), Joi.number())
        .required()
        .messages({
            'any.required': 'Name is required',
            'string.base': 'Name should be a type of string',
            'string.max': 'Name cannot exceed 255 characters',
        }),
      category: Joi.number()
        .required()
        .messages({
            'any.required': 'Category is required',
            'number.base': 'Category should be a valid number',
        }),
      cost_price: Joi.number()
        .required()
        .messages({
            'any.required': 'Cost price is required',
            'number.base': 'Cost price should be a valid number',
        }),
      sale_price: Joi.number()
        .required()
        .messages({
            'any.required': 'Sale price is required',
            'number.base': 'Sale price should be a valid number',
        }),
      quantity: Joi.number()
        .required()
        .messages({
            'any.required': 'Quantity is required',
            'number.base': 'Quantity should be a valid number',
        }),
        isNew: Joi.boolean().optional()
    //   description: Joi.string()
    //     .max(255)
    //     .required()
    //     .messages({
    //         'any.required': 'Description is required',
    //         'string.base': 'Description should be a type of string',
    //         'string.max': 'Description cannot exceed 255 characters',
    //     }),
});