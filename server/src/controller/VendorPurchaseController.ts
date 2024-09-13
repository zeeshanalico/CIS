import { Request, Response } from 'express';
import PurchaseService from '../services/PurchaseService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { CustomError } from '../utils/CustomError';
import _ from 'lodash';
import UserService from '../services/UserService';

class VendorPurchaseController {
    private readonly vendorPurchaseKeysArray;

    constructor(private readonly purchaseService: PurchaseService,private readonly userService:UserService) {
        this.vendorPurchaseKeysArray = ['id', 'vendor_id', 'purchase_id', 'qty', 'cost_price', 'created_at', 'updated_at'];
    }

    async createVendorPurchase(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.purchaseService.createPurchase(req.body);
            const filteredVendorPurchase = _.pick(result, this.vendorPurchaseKeysArray);
            sendSuccess(res, filteredVendorPurchase, 'Vendor purchase created successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async getVendorPurchaseById(req: Request, res: Response): Promise<void> {
        try {
            const vendorPurchase = await this.purchaseService.getPurchaseById(Number(req.params.id));
            if (!vendorPurchase) {
                throw new CustomError('Vendor purchase not found', 404);
            }

            const filteredVendorPurchase = _.pick(vendorPurchase, this.vendorPurchaseKeysArray);
            sendSuccess(res, filteredVendorPurchase, 'Vendor purchase fetched successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async updateVendorPurchase(req: Request, res: Response): Promise<void> {
        try {
            const updatedVendorPurchase = await this.purchaseService.updatePurchase({ id: Number(req.params.id), updatePurchaseInput: req.body });
            sendSuccess(res, updatedVendorPurchase, 'Vendor purchase updated successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async deleteVendorPurchase(req: Request, res: Response): Promise<void> {
        const deleteType = req.query.deleteType as 'soft' | 'hard' | undefined;

        try {
            const deletedVendorPurchase = await this.purchaseService.deletePurchase({ id: Number(req.params.id), deleteType });
            sendSuccess(res, deletedVendorPurchase, 'Vendor purchase deleted successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async getAllVendorPurchases(req: Request, res: Response): Promise<void> {
        const page = parseInt(req.query.page as string, 10) || 1;
        const take = parseInt(req.query.limit as string, 10) || undefined;
        const skip = (page - 1) * (take || 0);

        try {
            const { purchases, count } = await this.purchaseService.getAllPurchases({ skip, take });
            const filteredVendorPurchases = purchases.map(purchase => _.pick(purchase, this.vendorPurchaseKeysArray));

            const extraInfo = { count, pageNumber: page, pageSize: take, from: skip + 1, to: skip + filteredVendorPurchases.length };
            sendSuccess(res, filteredVendorPurchases, 'Vendor purchases fetched successfully', extraInfo);
        } catch (error) {
            sendError(res, error);
        }
    }
}

export default VendorPurchaseController;
