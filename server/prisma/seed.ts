import { PrismaClient, UserRole, InternalUserRole, ExpenseType, TransactionType } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    // Create Categories
    await prisma.$transaction(async (prisma) => {
        await prisma.category.createMany({
            data: [
                { name: 'Electronics' },
                { name: 'Groceries' },
                { name: 'Clothing' },
                { name: 'Books' },
                { name: 'Furniture' },
            ],
        });

        // Create Kiosks
        await prisma.kiosk.createMany({
            data: Array.from({ length: 10 }).map(() => ({
                name: `${faker.company.name()} Kiosk`,
                location: faker.location.streetAddress(),
            })),
        });

        // Fetch IDs for later use
        const [categories, kiosks] = await Promise.all([
            prisma.category.findMany({ select: { id: true } }),
            prisma.kiosk.findMany({ select: { id: true } }),
        ]);

        const categoryIds = categories.map(category => category.id);
        const kioskIds = kiosks.map(kiosk => kiosk.id);

        // Create Internal Users
        await prisma.internal_user.createMany({
            data: Array.from({ length: 5 }).map(() => ({
                name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: faker.helpers.arrayElement([InternalUserRole.ADMIN, InternalUserRole.SUPER_ADMIN]),
            })),
        });

        // Create Users
        await prisma.user.createMany({
            data: Array.from({ length: 20 }).map(() => ({
                name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: UserRole.USER,
            })),
        });

        // Fetch User IDs
        const users = await prisma.user.findMany({ select: { id: true } });
        const userIds = users.map(user => user.id);

        // Create Products
        await prisma.product.createMany({
            data: Array.from({ length: 20 }).map(() => ({
                name: faker.commerce.productName(),
                sale_price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
                quantity: faker.number.int({ min: 10, max: 200 }),
                category_id: faker.helpers.arrayElement(categoryIds),
                kiosk_id: faker.helpers.arrayElement(kioskIds),
            })),
        });

        // Create Purchases
        await prisma.purchase.createMany({
            data: Array.from({ length: 20 }).map(() => ({
                user_id: faker.helpers.arrayElement(userIds),
                kiosk_id: faker.helpers.arrayElement(kioskIds),
                purchase_date: faker.date.past(),
                amount: parseFloat(faker.commerce.price({ min: 100, max: 10000, dec: 2 })),
            })),
        });

        // Fetch Purchase IDs and Product IDs
        const purchases = await prisma.purchase.findMany({ select: { id: true } });
        const products = await prisma.product.findMany({ select: { id: true } });

        const purchaseIds = purchases.map(purchase => purchase.id);
        const productIds = products.map(product => product.id);

        // Create Batches
        await prisma.batch.createMany({
            data: Array.from({ length: 20 }).map(() => ({
                product_id: faker.helpers.arrayElement(productIds),
                quantity: faker.number.int({ min: 50, max: 500 }),
                cost_price: parseFloat(faker.commerce.price({ min: 20, max: 500, dec: 2 })),
                purchase_id: faker.helpers.arrayElement(purchaseIds),
            })),
        });

        // Create Expenses
        await prisma.expense.createMany({
            data: Array.from({ length: 20 }).map(() => ({
                kiosk_id: faker.helpers.arrayElement(kioskIds),
                amount: parseFloat(faker.commerce.price({ min: 50, max: 5000, dec: 2 })),
                expense_date: faker.date.past(),
                description: faker.commerce.productDescription(),
                expense_type: faker.helpers.arrayElement(Object.values(ExpenseType)),
            })),
        });

        // Create Journals
        await prisma.journal.createMany({
            data: Array.from({ length: 20 }).map(() => ({
                kiosk_id: faker.helpers.arrayElement(kioskIds),
                amount: parseFloat(faker.commerce.price({ min: 100, max: 10000, dec: 2 })),
                trx_type: faker.helpers.arrayElement(Object.values(TransactionType)),
                account: faker.finance.accountName(),
                description: faker.finance.transactionDescription(),
            })),
        });

        await prisma.customer.createMany({
            data: Array.from({ length: 20 }).map(() => ({
                name: `${faker.person.firstName()} ${faker.person.lastName()}`.substring(0, 50),
                email: faker.internet.email().substring(0, 100),
                phone: faker.phone.number().substring(0, 15),
                secret: faker.internet.password(),
            })),
        });
        // Fetch Customer IDs
        const customers = await prisma.customer.findMany({ select: { id: true } });
        const customerIds = customers.map(customer => customer.id);

        // Create Sales
        await prisma.sale.createMany({
            data: Array.from({ length: 20 }).map(() => ({
                customer_id: faker.helpers.arrayElement(customerIds),
                kiosk_id: faker.helpers.arrayElement(kioskIds),
                sub_total: parseFloat(faker.commerce.price({ min: 100, max: 1000, dec: 2 })),
                discount: parseFloat(faker.commerce.price({ min: 5, max: 50, dec: 2 })),
                total: parseFloat(faker.commerce.price({ min: 50, max: 1000, dec: 2 })),
                qty: faker.number.int({ min: 1, max: 50 }),
                sale_date: faker.date.past(),
            })),
        });

        const sales = await prisma.sale.findMany({ select: { id: true } })
        const saleIds = sales.map(sale => sale.id);

        // Create Sale Products
        await prisma.sale_product.createMany({
            data: Array.from({ length: 20 }).map(() => ({
                sale_id: faker.helpers.arrayElement(saleIds), // Assuming 20 sales created
                product_id: faker.helpers.arrayElement(productIds),
                quantity: faker.number.int({ min: 1, max: 50 }),
                unit_price: parseFloat(faker.commerce.price({ min: 10, max: 500, dec: 2 })),
                discount: parseFloat(faker.commerce.price({ min: 1, max: 50, dec: 2 })),
            })),
        });
        await prisma.vendor.createMany({
            data: Array.from({ length: 10 }).map(() => ({
                name: faker.company.name(),
                contact_info: faker.phone.number(),
            })),
        });
        // Fetch Vendor IDs
        const vendors = await prisma.vendor.findMany({ select: { id: true } });
        const vendorIds = vendors.map(vendor => vendor.id);

        // Create Transactions (Trx)
        await prisma.trx.createMany({
            data: Array.from({ length: 20 }).map(() => ({
                kiosk_id: faker.helpers.arrayElement(kioskIds),
                amount: parseFloat(faker.commerce.price({ min: 100, max: 10000, dec: 2 })),
                customer_id: faker.helpers.arrayElement(customerIds),
                vendor_id: faker.helpers.arrayElement(vendorIds),
            })),
        });

        // Create Vendors

        // Create Vendor Product Purchases
        await prisma.vendor_product_purchase.createMany({
            data: Array.from({ length: 20 }).map(() => ({
                vendor_id: faker.helpers.arrayElement(vendorIds),
                purchase_id: faker.helpers.arrayElement(purchaseIds),
                product_id: faker.helpers.arrayElement(productIds),
                qty: faker.number.int({ min: 10, max: 100 }),
                cost_price: parseFloat(faker.commerce.price({ min: 20, max: 500, dec: 2 })),
            })),
        });

        console.log('Seeding completed.');
    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
