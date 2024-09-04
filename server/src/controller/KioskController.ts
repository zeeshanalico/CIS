import { Request, Response } from 'express';
import KioskService from '../services/KioskService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { CustomError } from '../utils/CustomError';

class KioskController {
  constructor(private readonly kioskService: KioskService) {}

  async createKiosk(req: Request, res: Response): Promise<void> {
    try {
      const newKiosk = await this.kioskService.createKiosk(req.body);
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
    try {
      const kiosks = await this.kioskService.getAllKiosks();
      sendSuccess(res, kiosks, 'Kiosks fetched successfully');
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default KioskController;
