import express from 'express';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import VendorPurchaseController from '../../controller/VendorPurchaseController';
import VendorService from '../../services/VendorService';
import UserService from '../../services/UserService';
import createVendorPurchaseSchema from '../../dto/vendorPurchaseDto';
import PurchaseService from '../../services/PurchaseService';
const userService = new UserService(prisma);
const router = express.Router();
const purchaseService = new PurchaseService(prisma);
const productController = new VendorPurchaseController(purchaseService, userService);

router.post('/create', validateRequest(createVendorPurchaseSchema), (req, res) => productController.createVendorPurchase(req, res));//

export default router;
