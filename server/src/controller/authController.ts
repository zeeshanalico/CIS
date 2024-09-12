import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { LoginDto } from '../dto/LoginDto';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { CustomError } from '../utils/CustomError';
import { checkEmailExistence } from '../utils/checkEmailExists';
class AuthController {
    constructor(private readonly authService: AuthService) { }
    async login(req: Request, res: Response): Promise<void> {// res: {authToken(accessToken): string,  user: User}
        const { email, password, remember = false }: LoginDto = req.body;
        try {
            // const exists = await checkEmailExistence(req.body.email);
            // if (!exists) {
            //     throw new CustomError('Email does not exist', 400)
            // }
            const { accessToken, refreshToken, user } = await this.authService.login({ email, password });
            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            sendSuccess(res, { accessToken, user }, 'Login successful');
        } catch (error) {
            sendError(res, error);
        }
    }

    async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const refreshToken = req.cookies?.refreshToken;

            if (!refreshToken) {
                throw new CustomError('No refresh token provided', 401);
            }
            const accessToken = await this.authService.refreshToken(refreshToken);
            const user = await this.authService.getUserByRefreshToken(refreshToken);
            sendSuccess(res, { accessToken, user });
        } catch (error) {
            sendError(res, error);
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie('refreshToken', { httpOnly: true });
            sendSuccess(res, null, 'Logout successful');
        } catch (err) {
            sendError(res, err);
        }
    }
}

export default AuthController;
