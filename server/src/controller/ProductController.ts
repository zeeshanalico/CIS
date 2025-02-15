import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import { sendError, sendSuccess } from '../utils/responseUtils';
import UserService from '../services/UserService';
import { CustomError } from '../utils/CustomError';
import { parseBoolean } from '../utils/parseBoolean';
import { parseString } from '../utils/parseString';
import * as path from 'path'
import * as fs from 'fs/promises'


interface MulterRequest extends Request {
    file?: any;
}

class ProductController {
    constructor(private readonly productService: ProductService, private readonly userService: UserService) { }

    async addInventory(req: MulterRequest, res: Response): Promise<void> {
        const image = req.file;
        const { name, cost_price, sale_price, quantity, category: category_id, isNew = false } = req.body;
        console.log("request ______", { name, cost_price, sale_price, quantity, category: category_id, isNew });

        let fileName = '', filePath = '';
        try {
            if (image) {
                // throw new CustomError('No file uploaded', 400);

                const uploadsDir = path.resolve(__dirname, '../../uploads');
                const productImagesDir = path.join(uploadsDir, 'productsImages');

                // Create directories if they don't exist
                await fs.mkdir(uploadsDir, { recursive: true });
                await fs.mkdir(productImagesDir, { recursive: true });

                // Generate a unique file name
                fileName = `${name}_${Date.now()}_${image.originalname}`;
                filePath = path.join(productImagesDir, fileName);

                await fs.writeFile(filePath, image.buffer);
            }

            const user_id = req.user?.user_id
            const kiosk = await this.userService.getKioskByUserId(user_id as number)
            if (!kiosk) throw new CustomError('Kiosk is not assigned to you, so you can\'t add inventory', 404);
            const product = await this.productService.addInventory({
                name,
                cost_price: Number(cost_price),
                sale_price: Number(sale_price),
                quantity: Number(quantity),
                isNew: isNew === 'false' ? false : true,
                image_url: `${filePath}`,
                category: { connect: { id: Number(category_id) } },
                kiosk: { connect: { id: kiosk.id } },
                user: { connect: { id: user_id as number } }
            });
            sendSuccess(res, product, 'Inventory added successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async getProducts(req: Request, res: Response): Promise<void> {
        const page = parseInt(req.query.page as string, 10) || 1;
        const take = parseInt(req.query.limit as string, 10) || undefined;//for all results
        const skip = (page - 1) * (take || 0);//offset
        const category_id = req.query.category_id as string;//'34'|'undefined'
        const search = parseString(req.query.search as string)
        const availableProducts = parseBoolean(req.query.availableProducts as string) || false;

        try {
            const { products, count } = await this.productService.getProducts({ skip, take, category_id: category_id && category_id !== 'undefined' ? parseInt(category_id) : undefined, search, availableProducts });
            const extraInfo = { count, pageNumber: page, pageSize: take, from: skip + 1, to: skip + products.length }

            sendSuccess(res, products, 'Products fetched successfully', extraInfo);
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
