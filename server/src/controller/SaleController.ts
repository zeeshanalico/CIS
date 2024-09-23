import { Request, Response } from 'express';
import SaleService from '../services/SaleService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import UserService from '../services/UserService';
import { CustomError } from '../utils/CustomError';

class SaleController {
    constructor(private readonly saleService: SaleService, private readonly userService: UserService) { }

    async createSale(req: Request, res: Response) {

    }

}

export default SaleController;
