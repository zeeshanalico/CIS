// services/AuthService.ts

import { PrismaClient, User } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LoginDto } from '../dto/LoginDto';
import { CustomError } from '../utils/CustomError';
const bcrypt = require('bcrypt')

class AuthService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async login({ email, password }: LoginDto): Promise<{ accessToken: string, refreshToken: string, user: User }> {
        const user: User | null = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new CustomError('User not found', 404);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new CustomError('Invalid password', 401);
        }

        const { accessToken, refreshToken } = this.generateTokens(user);
        return { accessToken, refreshToken, user };
    }

    async refreshToken(refreshToken: string): Promise<string> {
        if (!refreshToken) {
            throw new CustomError('No refresh token provided', 401);
        }

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
            { id: user.id, email: user.email },
            accessTokenSecret,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
            refreshTokenSecret,
            { expiresIn: '7d' }
        );
        return { accessToken, refreshToken };
    }
}

export default AuthService;
