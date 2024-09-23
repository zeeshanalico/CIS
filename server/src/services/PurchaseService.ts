import { PrismaClient, Prisma, Purchase } from '@prisma/client';
import { CustomError } from '../utils/CustomError';

class PurchaseService {
    constructor(private readonly prisma: PrismaClient) { }

    async createPurchase({ product, vendor, qty, cost_price, user, kiosk }
        : {
            qty: number, cost_price: number,
            user: { connect: { id: number } },
            product: { connect: { id: number } },
            vendor: { connect: { id: number } },
            kiosk: { connect: { id: number } }
        },
    ): Promise<any> {

        return await this.prisma.$transaction(async trx => {
            const amount = qty * cost_price;
            const purchase = await trx.purchase.create({//bug: add trx & Journal entries
                data: { user, kiosk, amount, }
            })
            const vendorPurchaseProduct = await trx.vendor_product_purchase.create({
                data: {
                    purchase: { connect: { id: purchase.id } },
                    vendor,
                    product,
                    qty,
                    cost_price,
                }
            })
            return { vendorPurchaseProduct, purchase }
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
