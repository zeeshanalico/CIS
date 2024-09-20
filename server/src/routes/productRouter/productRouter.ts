import express from 'express';
import ProductController from '../../controller/ProductController';
import { prisma } from '../../connection/prisma';
import { validateRequest } from '../../middleware/validateRequest';
import ProductService from '../../services/ProductService';
import { createProductSchema } from '../../dto/productDto';
import UserService from '../../services/UserService';
const router = express.Router();

const productService = new ProductService(prisma);
const userService = new UserService(prisma)
const productController = new ProductController(productService, userService);

router.post('/create', validateRequest(createProductSchema), (req, res) => productController.addInventory(req, res));//batch,product,purchase? table will inserted
router.get('/', (req, res) => productController.getProducts(req, res));


router.get('/categories', (req, res) => productController.getCategories(req, res));//sequence matters

// Routes for /product/:id
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.put('/update/:id', (req, res) => productController.updateProduct(req, res));//futurework:validation schema
router.delete('/:id', (req, res) => productController.deleteProduct(req, res));

export default router;
