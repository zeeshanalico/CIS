import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { LoginDto } from '../dto/LoginDto';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { UserPayload } from '../types/UserPayload';
import { CustomError } from '../utils/CustomError';
class AuthController {
    constructor(private readonly authService: AuthService) { }
    async login(req: Request, res: Response): Promise<void> {// res: {authToken(accessToken): string,  user: User}
        const { email, password, remember = false }: LoginDto = req.body;
        try {
            const { accessToken, refreshToken, user } = await this.authService.login({ email, password });
            res.cookie('refreshToken', refreshToken,);
            sendSuccess(res, { accessToken, user }, 'Login successful');
        } catch (error) {
            sendError(res, error);
        }
    }

    async refreshToken(req: any, res: Response): Promise<void> {
        console.log(req.cookies);
        
        try {
            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken) {    
                throw new CustomError('No refresh token provided', 401);
            }
            const accessToken = await this.authService.refreshToken(refreshToken);
            
            sendSuccess(res, { accessToken });
        } catch (error) {
            sendError(res, error);
        }
    }
}

export default AuthController;
