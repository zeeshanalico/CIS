import { Request, Response } from 'express';
import VendorService from '../services/VendorService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { CustomError } from '../utils/CustomError';
import _ from 'lodash';

class VendorController {
    private readonly vendorKeysArray;

    constructor(private readonly vendorService: VendorService,) {
        this.vendorKeysArray = ['id', 'name', 'contact_info', 'created_at', 'updated_at'];
    }

    async createVendor(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.vendorService.createVendor(req.body)
            const filteredVendor = _.pick(result, this.vendorKeysArray);
            sendSuccess(res, filteredVendor, 'Vendor created successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async getVendorById(req: Request, res: Response): Promise<void> {
        try {
            const vendor = await this.vendorService.getVendorById(Number(req.params.id));
            if (!vendor) {
                throw new CustomError('Vendor not found', 404);
            }

            const filteredVendor = _.pick(vendor, this.vendorKeysArray);
            sendSuccess(res, filteredVendor, 'Vendor fetched successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async updateVendor(req: Request, res: Response): Promise<void> {
        try {
            const updatedVendor = await this.vendorService.updateVendor({ id: Number(req.params.id), updateVendorInput: req.body });
            sendSuccess(res, updatedVendor, 'Vendor updated successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async deleteVendor(req: Request, res: Response): Promise<void> {
        const deleteType = req.query.deleteType as 'soft' | 'hard' | undefined;

        try {
            const deletedVendor = await this.vendorService.deleteVendor({ id: Number(req.params.id), deleteType });
            sendSuccess(res, deletedVendor, 'Vendor deleted successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async getAllVendors(req: Request, res: Response): Promise<void> {
        const page = parseInt(req.query.page as string, 10) || 1;
        const take = parseInt(req.query.limit as string, 10) || undefined;
        const skip = (page - 1) * (take || 0);

        try {
            const { vendors, count } = await this.vendorService.getAllVendors({ skip, take });
            const filteredVendors = vendors.map(vendor => _.pick(vendor, this.vendorKeysArray));

            const extraInfo = { count, pageNumber: page, pageSize: take, from: skip + 1, to: skip + filteredVendors.length };
            sendSuccess(res, filteredVendors, 'Vendors fetched successfully', extraInfo);
        } catch (error) {
            sendError(res, error);
        }
    }
}

export default VendorController;
