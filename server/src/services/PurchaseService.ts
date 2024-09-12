import { PrismaClient } from "@prisma/client";

export class PurchaseService{
    constructor(private readonly prisma: PrismaClient){}
}