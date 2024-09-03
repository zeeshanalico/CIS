import Joi from 'joi';

export const loginSchema = Joi.object({
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
    remember: Joi.boolean().optional(),
});

export interface LoginDto {
    email: string;
    password: string;
    remember?: boolean;
}
