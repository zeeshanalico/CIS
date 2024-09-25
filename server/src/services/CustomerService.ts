import { PrismaClient, Prisma, Customer } from '@prisma/client';
import { CustomError } from '../utils/CustomError';

class CustomerService {
    constructor(private readonly prisma: PrismaClient) {}

    async createCustomer(
        createCustomerInput: Prisma.CustomerCreateInput
    ): Promise<Customer> {
        const existingCustomer = await this.prisma.customer.findFirst({
            where: { email: createCustomerInput.email }
        });
        
        if (existingCustomer) {
            throw new CustomError('Customer already exists', 400);
        }
        
        return await this.prisma.customer.create({
            data: createCustomerInput,
        });
    }

    async getCustomerById(id: number): Promise<Customer> {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
        });
        
        if (!customer) {
            throw new CustomError('Customer not found', 404);
        }
        
        return customer;
    }

    async updateCustomer({ id, updateCustomerInput }:
        {
            id: number,
            updateCustomerInput: Prisma.CustomerUpdateInput
        }
    ): Promise<Customer> {
        return await this.prisma.customer.update({
            where: { id },
            data: { ...updateCustomerInput, updated_at: new Date() },
        });
    }

    async deleteCustomer({ id, deleteType }: { id: number, deleteType: 'soft' | 'hard' | undefined }): Promise<Customer | null> {
        if (deleteType === 'soft') {
            return await this.softDeleteCustomer(id);
        } else if (deleteType === 'hard') {
            return await this.hardDeleteCustomer(id);
        } else {
            throw new CustomError('Invalid delete type', 400);
        }
    }

    async hardDeleteCustomer(id: number): Promise<Customer> {
        return await this.prisma.customer.delete({
            where: { id },
        });
    }

    async softDeleteCustomer(id: number): Promise<Customer> {
        return await this.prisma.customer.update({
            where: { id },
            data: { is_deleted: true, deleted_at: new Date() },
        });
    }

    async getAllCustomers({ skip, take }: { skip?: number; take?: number }): Promise<{ count: number; customers: Customer[] }> {
        const customers = await this.prisma.customer.findMany({
            skip,
            take,
            where: {
                is_deleted: false, // Only fetch non-deleted customers
            },
            orderBy: {
                created_at: 'desc',
            },
        });
        
        const count = await this.prisma.customer.count({ where: { is_deleted: false } });

        return { count, customers };
    }
}

export default CustomerService;
