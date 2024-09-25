import express from 'express';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import CustomerController from '../../controller/CustomerController';
import CustomerService from '../../services/CustomerService';
import { createCustomerSchema } from '../../dto/customerDto';
const router = express.Router();

const customerService = new CustomerService(prisma);
const customerController = new CustomerController(customerService);

// Route to create a new customer
router.post('/create', validateRequest(createCustomerSchema), (req, res) => customerController.createCustomer(req, res)); // tested
router.get('/get-all', (req, res) => customerController.getAllCustomers(req, res)); // tested

router.get('/:id', (req, res) => customerController.getCustomerById(req, res));

router.put('/:id', (req, res) => customerController.updateCustomer(req, res));

router.delete('/:id', (req, res) => customerController.deleteCustomer(req, res));

export default router;
