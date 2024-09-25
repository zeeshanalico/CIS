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
        name: string, cost_price: number, isNew: boolean, sale_price: number, quantity: number,
        category: { connect: { id: number } },
        kiosk: { connect: { id: number } },
        user: { connect: { id: number } }
    }): Promise<any> {
        const { cost_price, isNew, name, quantity, user, ...rest } = data;

        return await this.prisma.$transaction(async (trx) => {
            let product;
            let batch;
            let purchase;
            let vendor_product_purchase;
            const totalAmount = quantity * cost_price;

            if (isNew) {
                product = await trx.product.create({
                    data: { name, quantity, ...rest, }
                });
                // here if we are adding new product with qty more than 0 then create batch and purchase
                if (quantity > 0) {//if qty >&!=0
                    batch = await trx.batch.create({
                        data: {
                            product: { connect: { id: product.id } },
                            quantity,
                            cost_price: cost_price, // cost per item of a batch
                        }
                    });
                    purchase = await trx.purchase.create({//bug: add trx & Journal entries
                        data: {
                            user,
                            kiosk: data.kiosk,
                            amount: totalAmount,
                        }
                    })
                    vendor_product_purchase = await trx.vendor_product_purchase.create({
                        data: {
                            product: { connect: { id: product.id } },
                            purchase: { connect: { id: purchase.id } },
                            qty: quantity,
                            vendor: { connect: { id: -1 } },// vendor_id =-1 means vendor undefined
                            cost_price: cost_price
                        }
                    })
                    await trx.trx.create({
                        data: {
                            amount: totalAmount,
                            kiosk: data.kiosk,
                            vendor: { connect: { id: -1 } },// vendor_id =-1 means vendor undefined
                        },
                    })
                    const journalDebit = await trx.journal.create({
                        data: {
                            amount: totalAmount,
                            kiosk: data.kiosk,
                            trx_type: 'DEBIT',
                            account: `Inventory`,
                            description: 'Added inventory from vendor',
                        },
                    })
                    const journalCredit = await trx.journal.create({
                        data: {
                            kiosk: data.kiosk,
                            amount: totalAmount,
                            trx_type: "CREDIT",
                            account: "Accounts Payable",
                            description: "Purchase on credit from vendor",
                        },
                    })
                }
            } else {
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

                product = await trx.product.update({
                    where: { id: product.id },
                    data: {
                        quantity: product.quantity + quantity,
                    }
                });
                purchase = await trx.purchase.create({//bug: add trx & Journal entries
                    data: {
                        user,
                        kiosk: data.kiosk,
                        amount: totalAmount,
                    }
                })
                vendor_product_purchase = await trx.vendor_product_purchase.create({
                    data: {
                        product: { connect: { id: product.id } },
                        purchase: { connect: { id: purchase.id } },
                        qty: quantity,
                        vendor: { connect: { id: -1 } },// vendor_id =-1 means vendor undefined
                        cost_price: cost_price
                    }
                })
                await trx.trx.create({
                    data: {
                        amount: totalAmount,
                        kiosk: data.kiosk,
                        vendor: { connect: { id: -1 } },// vendor_id =-1 means vendor undefined
                    },
                })
                const journalDebit = await trx.journal.create({
                    data: {
                        amount: totalAmount,
                        kiosk: data.kiosk,
                        trx_type: 'DEBIT',
                        account: `Inventory`,
                        description: 'Added inventory from vendor',
                    },
                })
                const journalCredit = await trx.journal.create({
                    data: {
                        kiosk: data.kiosk,
                        amount: totalAmount,
                        trx_type: "CREDIT",
                        account: "Accounts Payable",
                        description: "Purchase on credit from vendor",
                    },
                })

            }
            return { product, batch, purchase, vendor_product_purchase };
        });
    }

    async getProducts({ skip, take, category_id, search, availableProducts }: { skip?: number | undefined; take?: number | undefined, category_id: number | undefined, search: string | undefined, availableProducts: boolean }): Promise<{ products: Product[], count: number }> {
        const products = await this.prisma.product.findMany({
            skip,
            take,
            where: {
                category_id,
                is_deleted: false,
                name: { contains: search, mode: 'insensitive' },
                quantity: availableProducts ? { not: { equals: 0 } } : undefined
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            },
            orderBy: { created_at: 'desc' },

        });
        const count = await this.prisma.product.count({
            where: {
                is_deleted: false,
                quantity: availableProducts ? { not: { equals: 0 } } : undefined
            },
        });
        return { products, count }
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
