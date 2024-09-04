import { PrismaClient, User, Internal_user } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { LoginDto } from '../dto/LoginDto';
import { CustomError } from '../utils/CustomError';
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

        if (!isPasswordValid)
            throw new CustomError('Invalid password', 403);

        const { accessToken, refreshToken } = this.generateTokens({ user_id: user.id, username: user.name, email: user.email, roles: [user.role] });
        const { id, name, email: user_email, role } = user;
        return { accessToken, refreshToken, user: { user_id: id, username: name, email: user_email, roles: [role] } };
    }

    refreshToken(refreshToken: string): string {//generating access token on the base of refresh token provided by frontend
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
        const user = jwt.verify(refreshToken, refreshTokenSecret) as UserPayload;
        const { accessToken } = this.generateTokens(user);
        return accessToken;
    }

    private generateTokens(user: UserPayload) {

        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

        const payload: UserPayload = { user_id: user.user_id, email: user.email, username: user.username, roles: user.roles };// shallow copy of the user object and remove the exp property if it exists
        // delete payload.exp;

        const accessToken = jwt.sign(
            payload,
            accessTokenSecret,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            payload,
            refreshTokenSecret,
            { expiresIn: '30d' }
        );

        return { accessToken, refreshToken };
    }
}

export default AuthService;
