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

  async getKioskById(id: number): Promise<Prisma.KioskGetPayload<{
    include: { user: true, internal_user: true };
  }> | null> {
    return await this.prisma.kiosk.findUnique({
      where: {
        is_deleted: false,
        id,
      },
      include: {
        user: true,
        internal_user: true

      },
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

  async softDeleteKiosk(id: number): Promise<Kiosk> {
    return await this.prisma.$transaction(async trx => {
      await trx.user.updateMany({
        where: { kiosk_id: id },
        data: { kiosk_id: null }
      })
      const kiosk = await trx.kiosk.update({
        where: { id },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });
      return kiosk;
    })
  }

  async hardDeleteKiosk(id: number): Promise<Kiosk> {
    return await this.prisma.$transaction(async (trx) => {
      await trx.user.updateMany({
        where: { kiosk_id: id },
        data: { kiosk_id: null }
      })
      const kiosk = await trx.kiosk.delete({
        where: { id },
      });
      return kiosk;
    })
  }

  async deleteKiosk({ id, deleteType }: { id: number, deleteType: string }): Promise<Kiosk | null> {
    if (deleteType === 'hard') {
      return await this.hardDeleteKiosk(id);
    } else if (deleteType === 'soft') {
      return await this.softDeleteKiosk(id);
    }
    else {
      return null;
    }
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
