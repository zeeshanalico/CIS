import express from 'express';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import UserController from '../../controller/UserController';
import UserService from '../../services/UserService';
import { createUserSchema } from '../../dto/userDto';
const router = express.Router();

const userService = new UserService(prisma);
const productController = new UserController(userService);

router.post('/create', validateRequest(createUserSchema), (req, res) => productController.createUser(req, res));//tested
router.get('/get-all', (req, res) => productController.getAllUsers(req, res));//tested

router.get('/:id', (req, res) => productController.getUserById(req, res));
router.put('/:id', (req, res) => productController.updateUser(req, res));
router.delete('/:id', (req, res) => productController.deleteUser(req, res));

export default router;
