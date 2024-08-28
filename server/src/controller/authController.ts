import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { LoginDto } from '../dto/LoginDto';
const { sendError, sendSuccess } = require('../utils/responseUtils');

class AuthController {
    constructor(private readonly authService: AuthService) { }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password }: LoginDto = req.body;
        try {
            const { accessToken, refreshToken, user } = await this.authService.login({ email, password });
            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            sendSuccess(res, { message: 'Login successful', accessToken, user });
        } catch (error) {
            sendError(res, error);
        }
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const refreshToken = req.cookies.refreshToken;
            const accessToken = await this.authService.refreshToken(refreshToken);
            sendSuccess(res, { accessToken });
        } catch (error) {
            sendError(res, error);
        }
    }
}

export default AuthController;
