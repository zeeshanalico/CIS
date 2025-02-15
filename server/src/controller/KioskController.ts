import { Request, Response } from 'express';
import KioskService from '../services/KioskService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { CustomError } from '../utils/CustomError';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash'
class KioskController {
  private readonly userKeysArray;
  constructor(private readonly kioskService: KioskService, private readonly prisma: PrismaClient) {
    this.userKeysArray = ['id', 'name', 'email', 'role', 'is_active'];
  }

  async createKiosk(req: Request, res: Response): Promise<void> {
    const { name, location = null, user: id } = req.body;
    const user_id = req.user?.user_id;
    try {
      const result = this.prisma.$transaction(async (trx) => {
        const newKiosk = await trx.kiosk.create({
          data: { name, location, internal_user: { connect: { id: user_id } } },
        });
        const user = await trx.user.update({
          where: { id },
          data: {
            kiosk: {
              connect: { id: newKiosk.id },
            },
          },
        });
        return { kiosk: true, user_updated: true }
      })

      sendSuccess(res, result, 'Kiosk created successfully');
    } catch (error) {
      sendError(res, error);
    }
  }

  async getKioskById(req: Request, res: Response): Promise<void> {
    console.log(req.params.id);

    try {
      const kiosk =  await this.kioskService.getKioskById(Number(req.params.id));
      if (!kiosk) {
        throw new CustomError('Kiosk not found', 404);
      }
      const topLevelAttributes = _.omit(kiosk, ['user', 'internal_user']);
      const filteredInterUser = _.pick(kiosk.internal_user, this.userKeysArray);
      const filteredUser = kiosk.user.map(u => _.pick(u, this.userKeysArray))
      const filteredKiosk = { ...topLevelAttributes, internal_user: filteredInterUser, user: filteredUser };

      sendSuccess(res, filteredKiosk, 'Kiosk fetched successfully');
    } catch (error) {
      sendError(res, error);
    }
  }

  async updateKiosk(req: Request, res: Response): Promise<void> {
    try {
      const updatedKiosk = await this.kioskService.updateKiosk(Number(req.params.id), req.body);
      sendSuccess(res, updatedKiosk, 'Kiosk updated successfully');
    } catch (error) {
      sendError(res, error);
    }
  }

  async deleteKiosk(req: Request, res: Response): Promise<void> {
    const deleteType = req.query.deleteType as string;
    try {
      const deletedKiosk = await this.kioskService.deleteKiosk({ id: Number(req.params.id), deleteType });
      sendSuccess(res, deletedKiosk, 'Kiosk deleted successfully');
    } catch (error) {
      sendError(res, error);
    }
  }

  async getAllKiosks(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string, 10) || 1;
    const take = parseInt(req.query.limit as string, 10) || undefined;//for all results
    const skip = (page - 1) * (take || 0);//offset
    try {
      const { kiosks, count } = await this.kioskService.getAllKiosks({ skip, take, });
      const filteredKiosks = kiosks.map(k => {
        const topLevelAttributes = _.omit(k, ['user', 'internal_user']); // Exclude 'user' to get top-level attributes
        return {
          ...topLevelAttributes,
          user: k.user.map(u => _.pick(u, this.userKeysArray)),
          internal_user: _.pick(k.internal_user, this.userKeysArray)
        };
      });
      const extraInfo = { count, pageNumber: page, pageSize: take, from: skip + 1, to: skip + filteredKiosks.length }
      sendSuccess(res, filteredKiosks, 'Kiosks fetched successfully', extraInfo);
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default KioskController;
