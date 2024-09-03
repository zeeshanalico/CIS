import { PrismaClient, User, Internal_user } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LoginDto } from '../dto/LoginDto';
import { CustomError } from '../utils/CustomError';
import UserService from './UserService';
import InternalUserService from './InternalUserService';
import { UserPayload } from '../types/UserPayload';
import bcrypt from 'bcrypt'
class AuthService {
    constructor(private readonly prisma: PrismaClient) { }

    async login({ email, password }: LoginDto): Promise<{ accessToken: string, refreshToken: string, user: UserPayload }> {
        let user: User | null | Internal_user = await this.prisma.user.findUnique({//finding user from both tables : user, Internal_user
            where: { email },
        });

        if (!user) {
            user = await this.prisma.internal_user.findUnique({ where: { email } });
            if (!user)
                throw new CustomError('User not found', 404);
        }

        // const pass = await bcrypt.hash(password, 10);
        // console.log(pass);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new CustomError('Invalid password', 401);
        }

        const { accessToken, refreshToken } = this.generateTokens(user);
        const { id, name, email: user_email, role } = user;
        return { accessToken, refreshToken, user: { user_id: id, username: name, email: user_email, roles: [role] } };
    }

    async refreshToken(refreshToken: string): Promise<string> {//generating access token on the base of refresh token provided by frontend
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
        try {
            const user = jwt.verify(refreshToken, refreshTokenSecret) as JwtPayload;
            const { accessToken } = this.generateTokens(user);
            return accessToken;
        } catch (err) {
            throw new CustomError('Invalid refresh token', 403);
        }
    }

    private generateTokens(user: JwtPayload) {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
        const accessToken = jwt.sign(
            { user_id: user.id, email: user.email },
            accessTokenSecret,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { id: user.id, email: user.email, username: user.name, role: [user.role] },
            refreshTokenSecret,
            { expiresIn: '30d' }
        );
        return { accessToken, refreshToken };
    }
}

export default AuthService;
