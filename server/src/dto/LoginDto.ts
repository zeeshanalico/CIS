import Joi from 'joi';
export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'A valid email is required',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
});

export interface LoginDto {
    email: string;
    password: string;
}
