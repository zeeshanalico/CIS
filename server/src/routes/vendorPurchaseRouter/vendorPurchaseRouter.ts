import express from 'express';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import VendorController from '../../controller/VendorController';
import VendorService from '../../services/VendorService';
import { createVendorSchema } from '../../dto/vendorDto';
const router = express.Router();

const vendorService = new VendorService(prisma);
const productController = new VendorController(vendorService);

router.post('/add', (req, res) => productController.createVendor(req, res));//

export default router;
