import { PrismaClient, Product, Category, Prisma } from '@prisma/client';
import { CustomError } from '../utils/CustomError';

class ProductService {
    constructor(private readonly prisma: PrismaClient) { }

    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        const product = await this.prisma.product.create({
            data,
        });
        return product;
    }
    async addInventory(data: {
        name: string, cost_price: number, isNew: boolean, sale_price: number, quantity: number, category: { connect: { id: number } }, kiosk: { connect: { id: number } }
    }): Promise<any> {
        const { cost_price, isNew, name, quantity, ...rest } = data;

        return await this.prisma.$transaction(async (trx) => {
            let product;
            let batch;

            if (isNew) {
                product = await trx.product.create({
                    data: { name, quantity, ...rest, }
                });

                batch = await trx.batch.create({
                    data: {
                        product: { connect: { id: product.id } },
                        quantity,
                        cost_price: cost_price, // cost per item of a batch
                    }
                });

            } else {//bug:what to do with sale_price when product is not new 
                // Find the existing product
                product = await trx.product.findUnique({
                    where: { id: Number(name) },  // assuming name is the product ID if not new
                });

                if (!product) {
                    throw new CustomError('Product not found', 404);
                }

                batch = await trx.batch.create({
                    data: {
                        product: { connect: { id: product.id } },
                        quantity,
                        cost_price: cost_price, // cost per item
                    }
                });

                // Update the product's total quantity
                await trx.product.update({
                    where: { id: product.id },
                    data: {
                        quantity: product.quantity + quantity,
                    }
                });
            }

            return { product, batch };
        });
    }


    async getProducts({ category_id }: { category_id: number | undefined  }): Promise<Product[]> {
        console.log(category_id);

        return await this.prisma.product.findMany({
            where: { category_id: category_id }
        });
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
