import express from 'express';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import SaleService from '../../services/SaleService';
import SaleController from '../../controller/SaleController';
import UserService from '../../services/UserService';
import { cartSchema } from '../../dto/saleDto';

const router = express.Router();
const userServcie = new UserService(prisma)
const customerService = new SaleService(prisma);
const customerController = new SaleController(customerService, userServcie);

router.post('/create', validateRequest(cartSchema), (req, res) => customerController.createSale(req, res));//tested
router.post('/create', validateRequest(cartSchema), (req, res) => customerController.create_Public_Self_Sale(req, res));//tested
// router.get('/get-all', (req, res) => productController.getAllUsers(req, res));//tested
// router.post('/update-kiosk-users/:id', validateRequest(updateKioskUsersSchema), (req, res) => productController.updateKioskUsers(req, res));//tested

// router.get('/:id', (req, res) => productController.getUserById(req, res));
// router.put('/update/:id', validateRequest(updateUserSchema), (req, res) => productController.updateUser(req, res));//tested
// router.delete('/:id', (req, res) => productController.deleteUser(req, res));

export default router;
