import express from 'express';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import KioskController from '../../controller/KioskController';
import KioskService from '../../services/KioskService';
import { createKioskSchema } from '../../dto/kioskDto';
const router = express.Router();

const kioskService = new KioskService(prisma);
const kioskController = new KioskController(kioskService);

router.post('/create', validateRequest(createKioskSchema), (req, res) => kioskController.createKiosk(req, res));//tested
router.get('/get-all', (req, res) => kioskController.getAllKiosks(req, res));

router.get('/:id', (req, res) => kioskController.getKioskById(req, res));
router.put('/:id', (req, res) => kioskController.updateKiosk(req, res));
router.delete('/:id', (req, res) => kioskController.deleteKiosk(req, res));

export default router;
