import { PrismaClient, Prisma, Kiosk } from '@prisma/client';

class KioskService {
  constructor(private readonly prisma: PrismaClient) {}

  async createKiosk(
    createKioskInput: Prisma.KioskCreateInput
  ): Promise<Kiosk> {
    return await this.prisma.kiosk.create({
      data: createKioskInput,
    });
  }

  async getKioskById(id: number): Promise<Kiosk | null> {
    return await this.prisma.kiosk.findUnique({
      where: { id },
    });
  }

  async updateKiosk(
    id: number,
    updateKioskInput: Prisma.KioskUpdateInput
  ): Promise<Kiosk> {
    return await this.prisma.kiosk.update({
      where: { id },
      data: updateKioskInput,
    });
  }

  // Soft delete 
  async softDeleteKiosk(id: number): Promise<Kiosk> {
    return await this.prisma.kiosk.update({
      where: { id },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
  }

  // Hard delete
  async deleteKiosk(id: number): Promise<Kiosk> {
    return await this.prisma.kiosk.delete({
      where: { id },
    });
  }

  // Retrieve all kiosks (with an option to include deleted ones)
  async getAllKiosks(includeDeleted: boolean = false): Promise<Kiosk[]> {
    return await this.prisma.kiosk.findMany({
      where: includeDeleted ? {} : { is_deleted: false },
    });
  }
}

export default KioskService;
