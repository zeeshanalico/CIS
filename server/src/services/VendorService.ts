import { PrismaClient, Prisma, Vendor } from '@prisma/client';
import { CustomError } from '../utils/CustomError';

class VendorService {
    constructor(private readonly prisma: PrismaClient) {}

    async createVendor(createVendorInput: Prisma.VendorCreateInput): Promise<Vendor> {
        const existingVendor = await this.prisma.vendor.findFirst({
            where: { name: createVendorInput.name },
        });

        if (existingVendor) {
            throw new CustomError('Vendor already exists', 400);
        }

        return await this.prisma.vendor.create({
            data: createVendorInput,
        });
    }

    async getVendorById(id: number): Promise<Vendor | null> {
        return await this.prisma.vendor.findUnique({
            where: { id },
        });
    }

    async updateVendor({ id, updateVendorInput }: { id: number, updateVendorInput: Prisma.VendorUpdateInput }): Promise<Vendor> {
        return await this.prisma.vendor.update({
            where: { id },
            data: { ...updateVendorInput, updated_at: new Date() },
        });
    }

    async deleteVendor({ id, deleteType }: { id: number, deleteType: 'soft' | 'hard' | undefined }): Promise<Vendor | null> {
        if (deleteType === 'soft') {
            return await this.softDeleteVendor(id);
        } else if (deleteType === 'hard') {
            return await this.hardDeleteVendor(id);
        } else {
            throw new CustomError('Invalid delete type', 400);
        }
    }

    async hardDeleteVendor(id: number): Promise<Vendor> {
        return await this.prisma.vendor.delete({
            where: { id },
        });
    }

    async softDeleteVendor(id: number): Promise<Vendor> {
        return await this.prisma.vendor.update({
            where: { id },
            data: { is_deleted: true, deleted_at: new Date() },
        });
    }

    async getAllVendors({ skip, take, available }: { skip?: number; take?: number | undefined, available?: boolean | undefined }): Promise<{ count: number; vendors: Vendor[] }> {
        const vendors = await this.prisma.vendor.findMany({
            skip,
            take,
            where: {
                is_deleted: false, // Fetch non-deleted vendors
            },
            orderBy: {
                created_at: 'desc',
            },
        });

        const count = await this.prisma.vendor.count({ where: { is_deleted: false } });
        return { count, vendors };
    }
}

export default VendorService;
