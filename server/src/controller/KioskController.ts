import { Request, Response } from 'express';
import KioskService from '../services/KioskService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { CustomError } from '../utils/CustomError';

class KioskController {
  constructor(private readonly kioskService: KioskService) { }

  async createKiosk(req: Request, res: Response): Promise<void> {
    const { name, location = null } = req.body;
    const user_id = req.user?.user_id;
    try {
      const newKiosk = await this.kioskService.createKiosk({
        name, location, internal_user: { connect: { id: user_id } }
      });
      sendSuccess(res, newKiosk, 'Kiosk created successfully');
    } catch (error) {
      sendError(res, error);
    }
  }

  async getKioskById(req: Request, res: Response): Promise<void> {
    try {
      const kiosk = await this.kioskService.getKioskById(Number(req.params.id));
      if (!kiosk) {
        throw new CustomError('Kiosk not found', 404);
      }
      sendSuccess(res, kiosk, 'Kiosk fetched successfully');
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
    try {
      const deletedKiosk = await this.kioskService.deleteKiosk(Number(req.params.id));
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
      const kiosks = await this.kioskService.getAllKiosks({skip,take});
      sendSuccess(res, kiosks, 'Kiosks fetched successfully');
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default KioskController;
