// services/ProductService.ts

import { PrismaClient, Product, Prisma } from '@prisma/client';
import { CustomError } from '../utils/CustomError';

class ProductService {
    constructor(private readonly prisma: PrismaClient) {}

    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        try {
            const product = await this.prisma.product.create({
                data,
            });
            return product;
        } catch (error) {
            throw new CustomError('Error creating product', 500);
        }
    }

    async getProducts(): Promise<Product[]> {
        try {
            return await this.prisma.product.findMany();
        } catch (error) {
            throw new CustomError('Error fetching products', 500);
        }
    }

    async getProductById(id: number): Promise<Product> {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id },
            });
            if (!product) {
                throw new CustomError('Product not found', 404);
            }
            return product;
        } catch (error) {
            throw new CustomError('Error fetching product', 500);
        }
    }

    async updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        try {
            const product = await this.prisma.product.update({
                where: { id },
                data,
            });
            return product;
        } catch (error) {
            throw new CustomError('Error updating product', 500);
        }
    }

    async deleteProduct(id: number): Promise<void> {
        try {
            await this.prisma.product.delete({
                where: { id },
            });
        } catch (error) {
            throw new CustomError('Error deleting product', 500);
        }
    }
}

export default ProductService
