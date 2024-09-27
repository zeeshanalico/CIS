import express from 'express';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import SaleService from '../../services/SaleService';
import ProductService from '../../services/ProductService';
import { cartSchema } from '../../dto/saleDto';
import { PublicController } from '../../controller/PublicController';

const router = express.Router();
const saleService = new SaleService(prisma)
const productService = new ProductService(prisma)
const publicController = new PublicController(saleService, productService)

router.post('/create-public-sale', validateRequest(cartSchema), (req, res) => publicController.public_create_Self_Sale(req, res));//tested
router.get('/get-public-products', (req, res) => publicController.public_get_Products(req, res));//tested
router.get('/get-public-categories', (req, res) => publicController.public_get_categories(req, res));//sequence matters

// router.get('/get-all', (req, res) => productController.getAllUsers(req, res));//tested
// router.post('/update-kiosk-users/:id', validateRequest(updateKioskUsersSchema), (req, res) => productController.updateKioskUsers(req, res));//tested

// router.get('/:id', (req, res) => productController.getUserById(req, res));
// router.put('/update/:id', validateRequest(updateUserSchema), (req, res) => productController.updateUser(req, res));//tested
// router.delete('/:id', (req, res) => productController.deleteUser(req, res));

export default router;
