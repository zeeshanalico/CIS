import { Faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    prisma.$transaction([
        prisma.internal_user.create({
            data: {
                name: "SuperAdmin",
                email: "superadmin@gmail.com",
                password: "$2b$10$0EAPEYn.MGaxGz7UTexT4O7qRlY3e1wbJrH8nU5j8MjTKvAEBLrjC",
                role: "SUPER_ADMIN",
            }
        }),
        prisma.vendor.create({
            data: {
                id: -1,
                name: "unknown",
                contact_info: '00000000',
            }
        })
    ])
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    });