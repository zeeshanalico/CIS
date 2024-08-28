// src/routes/itemsRoutes.ts
import express from 'express';
import ItemsController from '../../controller/ItemsController';
import { PrismaClient } from '@prisma/client'; // Make sure PrismaClient is correctly imported
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import { loginSchema } from '../../dto/LoginDto';
const router = express.Router();
const itemsController = new ItemsController(prisma);

router.post('/items', validateRequest(loginSchema), (req, res) => itemsController.createItem(req, res));
// router.get('/items', (req, res) => itemsController.getAllItems(req, res));

// // Routes for /items/:id
// router.get('/items/:id', (req, res) => itemsController.getItemById(req, res));
// router.put('/items/:id', (req, res) => itemsController.updateItem(req, res));
// router.delete('/items/:id', (req, res) => itemsController.deleteItem(req, res));

module.exports = router
