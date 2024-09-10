import Joi from 'joi';

// Create User Schema
export const createUserSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email should be a type of string',
            'string.empty': 'Email cannot be an empty field',
            'string.email': 'A valid email is required',
            'any.required': 'Email is required',
        }),
    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .messages({
            'string.base': 'Password should be a type of string',
            'string.empty': 'Password cannot be an empty field',
            'string.min': 'Password must be at least 6 characters',
            'string.max': 'Password cannot exceed 30 characters',
            'string.pattern.base': 'Password can only contain alphanumeric characters',
            'any.required': 'Password is required',
        }),
    name: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'Name should be a type of string',
            'string.empty': 'Name cannot be an empty field',
            'string.max': 'Name cannot exceed 255 characters',
            'any.required': 'Name is required',
        }),
    role: Joi.string()
        .valid('USER',)//future work adding multiple roles to create multiple users
        .required()
        .messages({
            'string.base': 'Role should be a type of string',
            'any.only': 'Role must be one of ADMIN, USER, or SUPER_ADMIN',
            'any.required': 'Role is required',
        }),
});

export const updateKioskUsersSchema = Joi.object({
    users: Joi.array().items(Joi.object({
        user_id: Joi.number()
            .required()
            .messages({
                'number.base': 'User ID should be a valid number',
                'any.required': 'User ID is required',
            }),
        name: Joi.string()
            .max(255)
            .required()
            .messages({
                'string.base': 'Name should be a type of string',
                'string.max': 'Name cannot exceed 255 characters',
                'any.required': 'Name is required',
            }),
    }))

})


export const updateUserSchema = Joi.object({
    email: Joi.string()
        .email()
        .optional()
        .messages({
            'string.base': 'Email should be a type of string',
            'string.email': 'A valid email is required',
        }),
    password: Joi.string()
        .min(6)
        .max(30)
        .optional()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .messages({
            'string.base': 'Password should be a type of string',
            'string.min': 'Password must be at least 6 characters',
            'string.max': 'Password cannot exceed 30 characters',
            'string.pattern.base': 'Password can only contain alphanumeric characters',
        }),
    name: Joi.string()
        .max(255)
        .optional()
        .messages({
            'string.base': 'Name should be a type of string',
            'string.max': 'Name cannot exceed 255 characters',
        }),
    role: Joi.string()
        .valid('ADMIN', 'USER', 'SUPER_ADMIN')
        .optional()
        .messages({
            'string.base': 'Role should be a type of string',
            'any.only': 'Role must be one of ADMIN, USER, or SUPER_ADMIN',
        }),
});

// User ID Param Schema
export const userIdParamSchema = Joi.object({
    id: Joi.number()
        .required()
        .messages({
            'number.base': 'ID should be a valid number',
            'any.required': 'ID is required',
        }),
});
