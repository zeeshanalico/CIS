import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import UserService from '../services/UserService';
import { CustomError } from '../utils/CustomError';

class ProductController {
    constructor(private readonly productService: ProductService, private readonly userService: UserService) { }

    async createProduct(req: Request, res: Response): Promise<void> {
        const { name, sale_price, quantity, category: category_id, kiosk_id = null } = req.body;
        const user_id = req.user?.user_id

        try {
            const kiosk = await this.userService.getKioskByUserId(user_id as number)
            if(!kiosk) throw new CustomError('Kiosk is not assigned to you', 404);
            const product = await this.productService.createProduct({
                name,
                sale_price,
                quantity,
                category: { connect: { id: category_id } },
                kiosk: { connect: { id: kiosk.id } }
            });
            sendSuccess(res, { product });
        } catch (error) {
            sendError(res, error);
        }
    }

    async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productService.getProducts();
            sendSuccess(res, products);
        } catch (error) {
            sendError(res, error);
        }
    }
    async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await this.productService.getCategories();
            sendSuccess(res, categories);
        } catch (error) {
            sendError(res, error);
        }
    }

    async getProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const product = await this.productService.getProductById(parseInt(id));
            sendSuccess(res, { product });
        } catch (error) {
            sendError(res, error);
        }
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const data = req.body;
        try {
            const product = await this.productService.updateProduct(parseInt(id), data);
            sendSuccess(res, { product });
        } catch (error) {
            sendError(res, error);
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await this.productService.deleteProduct(parseInt(id));
            sendSuccess(res, { message: 'Product deleted successfully' });
        } catch (error) {
            sendError(res, error);
        }
    }
}

export default ProductController;
