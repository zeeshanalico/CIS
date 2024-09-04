import express from 'express';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import UserController from '../../controller/UserController';
import UserService from '../../services/UserService';
import { createUserSchema } from '../../dto/userDto';
const router = express.Router();

const userService = new UserService(prisma);
const productController = new UserController(userService);

router.post('/create', validateRequest(createUserSchema), (req, res) => productController.createUser(req, res));
router.get('/get-all', (req, res) => productController.getAllUsers(req, res));

export default router;
