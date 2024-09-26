import SaleService from "../services/SaleService";
import { Request, Response } from 'express';
import { sendSuccess, sendError } from "../utils/responseUtils";
export class PublicController {
    constructor(private readonly saleService: SaleService) { }

    async create_Public_Self_Sale(req: Request, res: Response) {
        // try {
        //     const result = await this.saleService.create_Public_Self_Sale({ ...req.body, });
        //     sendSuccess(res, result, 'Vendor purchase created successfully');
        // } catch (error) {
        //     sendError(res, error);
        // }
    }
}
