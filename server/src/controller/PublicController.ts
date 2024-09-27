import SaleService from "../services/SaleService";
import { Request, Response } from 'express';
import { sendSuccess, sendError } from "../utils/responseUtils";
import { parseString } from "../utils/parseString";
import ProductService from "../services/ProductService";
import { parseBoolean } from "../utils/parseBoolean";
export class PublicController {
    constructor(private readonly saleService: SaleService, private readonly productService: ProductService) { }

    async public_create_Self_Sale(req: Request, res: Response) {
        try {
            const result = await this.saleService.create_Public_Self_Sale({ ...req.body, });
            sendSuccess(res, result, 'Vendor purchase created successfully');
        } catch (error) {
            sendError(res, error);
        }
    }

    async public_get_Products(req: Request, res: Response) {
        const page = parseInt(req.query.page as string, 10) || 1;
        const take = parseInt(req.query.limit as string, 10) || undefined;//for all results
        const skip = (page - 1) * (take || 0);//offset
        const category_id = req.query.category_id as string;//'34'|'undefined'
        const search = parseString(req.query.search as string)
        const availableProducts = parseBoolean(req.query.availableProducts as string) || false;
        const priceRange = parseInt(req.query.priceRange as string)

        try {
            const productWithHighestPrice = await this.productService.getProductWithHighestPrice()
            const productWithLowestPrice = await this.productService.getProductWithLowestPrice()
            const { products, count } = await this.productService.getProducts({ skip, take, category_id: category_id && category_id !== 'undefined' ? parseInt(category_id) : undefined, search, availableProducts, priceRange:Number(priceRange) });
            const extraInfo = { count, pageNumber: page, pageSize: take, from: skip + 1, to: skip + products.length, productWithLowestPrice, productWithHighestPrice }
            sendSuccess(res, products, 'Products fetched successfully', extraInfo);
        } catch (error) {
            sendError(res, error);
        }
    }

    async public_get_categories(req: Request, res: Response) {
        try {
            const categories = await this.productService.getCategories();
            sendSuccess(res, categories);
        } catch (error) {
            sendError(res, error);
        }
    }
}
