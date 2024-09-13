import { PrismaClient, Prisma, Purchase } from '@prisma/client';
import { CustomError } from '../utils/CustomError';

class PurchaseService {
    constructor(private readonly prisma: PrismaClient) {}

    async createPurchase(createPurchaseInput: Prisma.PurchaseCreateInput): Promise<Purchase> {
        return await this.prisma.purchase.create({
            data: createPurchaseInput,
        });
    }

    async getPurchaseById(id: number): Promise<Purchase | null> {
        return await this.prisma.purchase.findUnique({
            where: { id },
        });
    }

    async updatePurchase({ id, updatePurchaseInput }: { id: number, updatePurchaseInput: Prisma.PurchaseUpdateInput }): Promise<Purchase> {
        return await this.prisma.purchase.update({
            where: { id },
            data: { ...updatePurchaseInput, updated_at: new Date() },
        });
    }

    async deletePurchase({ id, deleteType }: { id: number, deleteType: 'soft' | 'hard' | undefined }): Promise<Purchase | null> {
        if (deleteType === 'soft') {
            return await this.softDeletePurchase(id);
        } else if (deleteType === 'hard') {
            return await this.hardDeletePurchase(id);
        } else {
            throw new CustomError('Invalid delete type', 400);
        }
    }

    async hardDeletePurchase(id: number): Promise<Purchase> {
        return await this.prisma.purchase.delete({
            where: { id },
        });
    }

    async softDeletePurchase(id: number): Promise<Purchase> {
        return await this.prisma.purchase.update({
            where: { id },
            data: { is_deleted: true, deleted_at: new Date() },
        });
    }

    async getAllPurchases({ skip, take, available }: { skip?: number; take?: number | undefined, available?: boolean | undefined }): Promise<{ count: number; purchases: Purchase[] }> {
        const purchases = await this.prisma.purchase.findMany({
            skip,
            take,
            where: {
                is_deleted: false, // Fetch non-deleted purchases
            },
            orderBy: {
                created_at: 'desc',
            },
        });

        const count = await this.prisma.purchase.count({ where: { is_deleted: false } });
        return { count, purchases };
    }
}

export default PurchaseService;
