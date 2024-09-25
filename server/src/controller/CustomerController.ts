import { Request, Response } from 'express';
import CustomerService from '../services/CustomerService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import { CustomError } from '../utils/CustomError';
import _ from 'lodash';

class CustomerController {
    private readonly customerKeysArray;

    constructor(private readonly customerService: CustomerService) {
        this.customerKeysArray = ['id', 'name', 'email', 'contact_info', 'created_at', 'updated_at'];
    }

    async createCustomer(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.customerService.createCustomer(req.body);
            const filteredCustomer = _.pick(result, this.customerKeysArray);
            sendSuccess(res, filteredCustomer, 'Customer created successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async getCustomerById(req: Request, res: Response): Promise<void> {
        try {
            const customer = await this.customerService.getCustomerById(Number(req.params.id));
            if (!customer) {
                throw new CustomError('Customer not found', 404);
            }

            const filteredCustomer = _.pick(customer, this.customerKeysArray);
            sendSuccess(res, filteredCustomer, 'Customer fetched successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async updateCustomer(req: Request, res: Response): Promise<void> {
        try {
            const updatedCustomer = await this.customerService.updateCustomer({
                id: Number(req.params.id),
                updateCustomerInput: req.body,
            });
            const filteredCustomer = _.pick(updatedCustomer, this.customerKeysArray);
            sendSuccess(res, filteredCustomer, 'Customer updated successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async deleteCustomer(req: Request, res: Response): Promise<void> {
        const deleteType = req.query.deleteType as 'soft' | 'hard' | undefined;

        try {
            const deletedCustomer = await this.customerService.deleteCustomer({
                id: Number(req.params.id),
                deleteType,
            });
            const filteredCustomer = _.pick(deletedCustomer, this.customerKeysArray);
            sendSuccess(res, filteredCustomer, 'Customer deleted successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async getAllCustomers(req: Request, res: Response): Promise<void> {
        const page = parseInt(req.query.page as string, 10) || 1;
        const take = parseInt(req.query.limit as string, 10) || undefined;
        const skip = (page - 1) * (take || 0);
        try {
            const { customers, count } = await this.customerService.getAllCustomers({ skip, take });
            const filteredCustomers = customers.map(customer => _.pick(customer, this.customerKeysArray));

            const extraInfo = {
                count,
                pageNumber: page,
                pageSize: take,
                from: skip + 1,
                to: skip + filteredCustomers.length,
            };
            sendSuccess(res, filteredCustomers, 'Customers fetched successfully', extraInfo);
        } catch (error) {
            sendError(res, error);
        }
    }
}

export default CustomerController;
