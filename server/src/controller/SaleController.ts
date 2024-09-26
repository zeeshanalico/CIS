import { Request, Response } from 'express';
import SaleService from '../services/SaleService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import UserService from '../services/UserService';
import { CustomError } from '../utils/CustomError';

class SaleController {
    constructor(private readonly saleService: SaleService, private readonly userService: UserService) { }

    async createSale(req: Request, res: Response) {
        const user_id = req.user?.user_id
        try {
            const kiosk = await this.userService.getKioskByUserId(user_id as number)
            if (!kiosk) throw new CustomError('Kiosk is not assigned to you', 404);
            const result = await this.saleService.createSale({ ...req.body, kiosk_id: kiosk.id, });
            sendSuccess(res, result, 'Vendor purchase created successfully');
        } catch (error) {
            sendError(res, error);
        }

    }
}

export default SaleController;
