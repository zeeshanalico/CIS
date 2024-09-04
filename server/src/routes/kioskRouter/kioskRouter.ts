import express from 'express';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import KioskController from '../../controller/KioskController';
import KioskService from '../../services/KioskService';
import { createKioskSchema } from '../../dto/kioskDto';
const router = express.Router();

const kioskService = new KioskService(prisma);
const kioskController = new KioskController(kioskService);

router.post('/create', validateRequest(createKioskSchema), (req, res) => kioskController.createKiosk(req, res));

export default router;
