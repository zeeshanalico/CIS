import { PrismaClient, Prisma, User, Kiosk } from '@prisma/client';
import { CustomError } from '../utils/CustomError';

class UserService {
    constructor(private readonly prisma: PrismaClient) { }

    async createUser(
        createUserInput: Prisma.UserCreateInput
    ): Promise<User> {
        const existingUser = await this.prisma.user.findFirst({
            where: { email: createUserInput.email }
        })
        const existingInternalUser = await this.prisma.internal_user.findFirst({
            where: { email: createUserInput.email }
        })

        if (existingUser || existingInternalUser) 
            throw new CustomError(`User already exists with this email ${existingUser?.is_deleted || 'but deleted'}`, 400);//future bug: existingInternalUser.is_deleted check
        return await this.prisma.user.create({
            data: createUserInput,
        });
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) throw new CustomError('User not found', 404);
        return user
    }

    async updateUser({ id, resetPassword, name, email }: { id: number, resetPassword: string, name: string, email: string, }): Promise<User> {

        return await this.prisma.user.update({
            where: { id },
            data: { name, email, password: resetPassword ? resetPassword : undefined, updated_at: new Date() },
        });
    }

    async deleteUser({ id, deleteType }: { id: number, deleteType: 'soft' | 'hard' | undefined }): Promise<User | null> {
        if (deleteType === 'soft') {
            return await this.softDeleteUser(id);
        }
        else if (deleteType === 'hard') {
            return await this.hardDeleteUser(id);
        }
        else throw new CustomError('Invalid delete type', 400);
    }
    async hardDeleteUser(id: number): Promise<User> {
        return await this.prisma.user.delete({
            where: { id },
        });
    }
    async softDeleteUser(id: number): Promise<User> {
        return await this.prisma.user.update({
            where: { id },
            data: { is_deleted: true, deleted_at: new Date() },

        });
    }


    async getAllUsers({ skip, take, available }: { skip?: number; take?: number | undefined, available?: boolean | undefined }): Promise<{ count: number; users: User[] }> {

        const users = await this.prisma.user.findMany({
            skip,
            take,
            where: {
                is_deleted: false, // Assuming you want to fetch only non-deleted users
                kiosk_id: available ? { equals: null } : undefined,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
        const count = await this.prisma.user.count({ where: { is_deleted: false } });

        return { count, users }
    }

    async updateKioskUsers({ id, users }: { id: number, users: { user_id: number, name: string }[] }) {//id is kiosks_id

        await this.prisma.user.updateMany({
            where: { kiosk_id: id },
            data: { kiosk_id: null }
        })

        const userUpdates = users.map(user =>
            this.prisma.user.update({
                where: { id: user.user_id },
                data: { kiosk_id: id }
            })
        )
        return await Promise.all(userUpdates);
    }

    async getKioskByUserId(id: number): Promise<Kiosk | null> {
        const user = await this.getUserById(id);
        if(user.kiosk_id){
            const kiosk = await this.prisma.kiosk.findUnique({
                where: { id: user.kiosk_id },
            })
            return kiosk;
        }
        return null;
    }
}

export default UserService;
