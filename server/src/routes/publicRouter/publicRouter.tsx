import express from 'express';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import SaleService from '../../services/SaleService';
import SaleController from '../../controller/SaleController';
import UserService from '../../services/UserService';
import { cartSchema } from '../../dto/saleDto';
import { PublicController } from '../../controller/publicController';

const router = express.Router();
const saleService = new SaleService(prisma)
const publicController = new PublicController(saleService)

router.post('/create', validateRequest(cartSchema), (req, res) => publicController.create_Public_Self_Sale(req, res));//tested
// router.get('/get-all', (req, res) => productController.getAllUsers(req, res));//tested
// router.post('/update-kiosk-users/:id', validateRequest(updateKioskUsersSchema), (req, res) => productController.updateKioskUsers(req, res));//tested

// router.get('/:id', (req, res) => productController.getUserById(req, res));
// router.put('/update/:id', validateRequest(updateUserSchema), (req, res) => productController.updateUser(req, res));//tested
// router.delete('/:id', (req, res) => productController.deleteUser(req, res));

export default router;
