import { PrismaClient, Prisma, Internal_user } from '@prisma/client';

class InternalUserService {
    constructor(private readonly prisma: PrismaClient) { }

    async createInternalUser(
        createInternalUserInput: Prisma.Internal_userCreateInput
    ): Promise<Internal_user> {
        return await this.prisma.internal_user.create({
            data: createInternalUserInput,
        });
    }

    async getInternalUserById(id: number): Promise<Internal_user | null> {
        return await this.prisma.internal_user.findUnique({
            where: { id },
        });
    }

    async updateInternalUser(
        id: number,
        updateInternalUserInput: Prisma.Internal_userUpdateInput
    ): Promise<Internal_user> {
        return await this.prisma.internal_user.update({
            where: { id },
            data: updateInternalUserInput,
        });
    }

    async deleteInternalUser(id: number): Promise<Internal_user> {
        return await this.prisma.internal_user.delete({
            where: { id },
        });
    }

    async getAllInternalUsers(): Promise<Internal_user[]> {
        return await this.prisma.internal_user.findMany();
    }
}

export default InternalUserService;
