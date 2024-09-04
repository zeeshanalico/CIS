import Joi from 'joi';

// Create Kiosk Schema
export const createKioskSchema = Joi.object({
    name: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'Name should be a type of string',
            'string.empty': 'Name cannot be an empty field',
            'string.max': 'Name cannot exceed 255 characters',
            'any.required': 'Name is required',
        }),
    location: Joi.string()
        .max(255)
        .optional()
        .messages({
            'string.base': 'Location should be a type of string',
            'string.max': 'Location cannot exceed 255 characters',
        }),
    registered_by: Joi.number()
        .optional()
        .messages({
            'number.base': 'Registered by should be a valid number',
        }),
    is_deleted: Joi.boolean()
        .optional()
        .messages({
            'boolean.base': 'Is deleted should be a boolean value',
        }),
    created_at: Joi.date()
        .optional()
        .messages({
            'date.base': 'Created at should be a valid date',
        }),
    updated_at: Joi.date()
        .optional()
        .messages({
            'date.base': 'Updated at should be a valid date',
        }),
    deleted_at: Joi.date()
        .optional()
        .messages({
            'date.base': 'Deleted at should be a valid date',
        }),
});

// Update Kiosk Schema
export const updateKioskSchema = Joi.object({
    name: Joi.string()
        .max(255)
        .optional()
        .messages({
            'string.base': 'Name should be a type of string',
            'string.empty': 'Name cannot be an empty field',
            'string.max': 'Name cannot exceed 255 characters',
        }),
    location: Joi.string()
        .max(255)
        .optional()
        .messages({
            'string.base': 'Location should be a type of string',
            'string.max': 'Location cannot exceed 255 characters',
        }),
    registered_by: Joi.number()
        .optional()
        .messages({
            'number.base': 'Registered by should be a valid number',
        }),
    is_deleted: Joi.boolean()
        .optional()
        .messages({
            'boolean.base': 'Is deleted should be a boolean value',
        }),
    created_at: Joi.date()
        .optional()
        .messages({
            'date.base': 'Created at should be a valid date',
        }),
    updated_at: Joi.date()
        .optional()
        .messages({
            'date.base': 'Updated at should be a valid date',
        }),
    deleted_at: Joi.date()
        .optional()
        .messages({
            'date.base': 'Deleted at should be a valid date',
        }),
});

// Kiosk ID Param Schema
export const kioskIdParamSchema = Joi.object({
    id: Joi.number()
        .required()
        .messages({
            'number.base': 'ID should be a valid number',
            'any.required': 'ID is required',
        }),
});
