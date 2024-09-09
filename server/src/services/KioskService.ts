import { PrismaClient, Prisma, Kiosk } from '@prisma/client';

class KioskService {
  constructor(private readonly prisma: PrismaClient) { }

  async createKiosk(
    createKioskInput: Prisma.KioskCreateInput
  ): Promise<Kiosk> {
    return await this.prisma.kiosk.create({
      data: createKioskInput
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

  async getAllKiosks({ skip, take }: { skip?: number; take?: number | undefined }): Promise<{
    count: number, kiosks: Array<Prisma.KioskGetPayload<{
      include: { user: true, internal_user: true };
    }>>
  }> {
    const kiosks = await this.prisma.kiosk.findMany({
      skip,
      take,
      where: {
        is_deleted: false,
      },
      include: {
        user: true,
        internal_user: true

      },
      orderBy: {
        created_at: 'desc',
      },
    });


    const count = await this.prisma.kiosk.count({ where: { is_deleted: false } });
    return { count, kiosks };
  }
}

export default KioskService;
