import { PrismaClient, Prisma, User } from '@prisma/client';

class UserService {
    constructor(private readonly prisma: PrismaClient) { }

    async createUser(
        createUserInput: Prisma.UserCreateInput
    ): Promise<User> {
        return await this.prisma.user.create({
            data: createUserInput,
        });
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async updateUser(
        id: number,
        updateUserInput: Prisma.UserUpdateInput
    ): Promise<User> {
        return await this.prisma.user.update({
            where: { id },
            data: updateUserInput,
        });
    }

    async deleteUser(id: number): Promise<User> {
        return await this.prisma.user.delete({
            where: { id },
        });
    }

    async getAllUsers({ skip, take, available }: { skip?: number; take?: number | undefined, available?: boolean }): Promise<User[]> {
        
        return await this.prisma.user.findMany({
            skip,
            take,
            where: {
                is_deleted: false, // Assuming you want to fetch only non-deleted users
                kiosk_id: available ? { equals: null } : undefined,
            },
            orderBy: {
                created_at: 'desc', // Optional: Order users by creation date
            },
        });
    }
}

export default UserService;
