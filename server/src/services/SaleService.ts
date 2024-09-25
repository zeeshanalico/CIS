import { PrismaClient, Prisma, Sale_product, Sale, Trx, Journal } from '@prisma/client';
import { CustomError } from '../utils/CustomError';

export interface CartProducts {
    product_id: number;
    units: number;
    unit_price: number;
}

export interface Cart {
    cartProducts: CartProducts[];
    discount: number;
    customer_id: number;
    subtotal: number;
    total: number;
    user_id: number;
    kiosk_id: number;
    qty: number;
}

class SaleService {
    constructor(private readonly prisma: PrismaClient) { }

    async createSale(input: Cart) {
        const { cartProducts, discount, customer_id, kiosk_id, user_id, subtotal, total } = input;//here discount is total discount
        const qty = cartProducts.reduce((acc, product) => acc + product.units, 0);

        return this.prisma.$transaction(async (trx: Prisma.TransactionClient) => {

            const sale = await this.addSale({
                trx,
                data: {
                    sub_total: subtotal,
                    total,
                    discount,
                    qty,
                    customer: { connect: { id: customer_id } },
                    kiosk: { connect: { id: kiosk_id } },
                },
            });

            // Add Sale products logic here
            for (const product of cartProducts) {
                await this.addSaleProduct({
                    trx,
                    data: {
                        sale: { connect: { id: sale.id } },
                        product: { connect: { id: product.product_id } },
                        quantity: product.units,//quantity of individual product
                        unit_price: product.unit_price,
                        //in this table(sale_product) discount can also be added for individual products;

                    },
                });
            }

            // const transaction = await this.addTRX({
            //     trx,
            //     data: {
            //         amount: total,
            //         customer: { connect: { id: customer_id } },
            //         kiosk: { connect: { id: kiosk_id } },
            //         // vendor:{connect:{id:user_id}},
            //     },
            // });

            const journal = await this.addJournal({
                trx,
                data: {
                    amount: total,
                    kiosk: { connect: { id: kiosk_id } },
                    trx_type: 'DEBIT',
                    account: '1',
                    description: 'n/a',
                    
                    // vendor:{connect:{id:user_id}},
                },
            })
            return sale;
        });


    }

    async addSale({ trx, data }: { trx?: Prisma.TransactionClient; data: Prisma.SaleCreateInput }): Promise<Sale> {
        let prismaInstance: PrismaClient | Prisma.TransactionClient = trx || this.prisma;
        return await prismaInstance.sale.create({ data });
    }

    async addSaleProduct({ trx, data }: { trx?: Prisma.TransactionClient; data: Prisma.Sale_productCreateInput }): Promise<Sale_product> {
        let prismaInstance: PrismaClient | Prisma.TransactionClient = trx || this.prisma;
        return await prismaInstance.sale_product.create({ data });
    }
    async addTRX({ trx, data }: { trx?: Prisma.TransactionClient; data: Prisma.TrxCreateInput }): Promise<Trx> {
        let prismaInstance: PrismaClient | Prisma.TransactionClient = trx || this.prisma;
        return await prismaInstance.trx.create({ data });
    }
    async addJournal({ trx, data }: { trx?: Prisma.TransactionClient; data: Prisma.JournalCreateInput }): Promise<Journal> {
        let prismaInstance: PrismaClient | Prisma.TransactionClient = trx || this.prisma;
        return await prismaInstance.journal.create({ data });
    }
}

export default SaleService;
