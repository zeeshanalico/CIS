import { PrismaClient, Product, Category, Prisma } from '@prisma/client';
import { CustomError } from '../utils/CustomError';

class SaleService {
    constructor(private readonly prisma: PrismaClient) { }

    async createSale() {
        
    }

}

export default SaleService;
