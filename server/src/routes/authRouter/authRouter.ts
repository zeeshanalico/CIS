import express from 'express'
import { prisma } from '../../connection/prisma';
import AuthController from '../../controller/authController';
import { validateRequest } from '../../middleware/validateRequest';
import AuthService from '../../services/AuthService';
import { loginSchema } from '../../dto/LoginDto';
const authService = new AuthService(prisma);
const authController = new AuthController(authService);

const router = express.Router();

router.post('/login', validateRequest(loginSchema), (req, res) => authController.login(req, res));
router.post('/refresh-token', (req, res) => authController.refreshToken(req, res));
router.post('/logout', (req, res) => authController.logout(req, res));

// router.post('/', (req, res) => authController.refreshToken(req, res));
export default router;