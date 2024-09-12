import { PrismaClient, Product,Category, Prisma } from '@prisma/client';
import { CustomError } from '../utils/CustomError';

class ProductService {
    constructor(private readonly prisma: PrismaClient) { }

    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        const product = await this.prisma.product.create({
            data,
        });
        return product;
    }

    async getProducts(): Promise<Product[]> {
        return await this.prisma.product.findMany();
    }

    
    async getCategories(): Promise<Category[]> {
        return await this.prisma.category.findMany();
    }


    async getProductById(id: number): Promise<Product> {

        const product = await this.prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new CustomError('Product not found', 404);
        }
        return product;

    }

    async updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        const product = await this.prisma.product.update({
            where: { id },
            data,
        });
        return product;
    }

    async deleteProduct(id: number): Promise<void> {
        await this.prisma.product.delete({
            where: { id },
        });
    }
}

export default ProductService
