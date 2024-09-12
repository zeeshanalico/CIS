import express from 'express';
import ProductController from '../../controller/ProductController';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import ProductService from '../../services/ProductService';
import { loginSchema } from '../../dto/LoginDto';
const router = express.Router();

const productService = new ProductService(prisma);
const productController = new ProductController(productService);

router.post('/', validateRequest(loginSchema), (req, res) => productController.createProduct(req, res));
router.get('/', (req, res) => productController.getProducts(req, res));


router.get('/categories', (req, res) => productController.getCategories(req, res));//sequence matters
// Routes for /product/:id
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.put('/:id', (req, res) => productController.updateProduct(req, res));
router.delete('/:id', (req, res) => productController.deleteProduct(req, res));

export default router;
