import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";
import { IProductService } from "../interfaces/IProductService";
import { ProductNotFoundError } from "../utils/ErrorTypes";

@injectable()
export class ProductController {
    private productService: IProductService;

    constructor(@inject(TYPES.IProductService) productService: IProductService) {
        this.productService = productService;
    }

    /**
     * @swagger
     * /products:
     *   post:
     *     summary: Create a new product
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name: { type: 'string' }
     *               description: { type: 'string' }
     *               price: { type: 'number' }
     *               stock: { type: 'integer' }
     *               category: { type: 'string' }
     *               image: { type: 'string' }
     *     responses:
     *       201:
     *         description: Product created successfully
     */
    async createProduct(req: Request, res: Response) {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /products:
     *   get:
     *     summary: Get all products
     *     tags: [Products]
     *     parameters:
     *       - in: query
     *         name: search
     *         schema: { type: 'string' }
     *       - in: query
     *         name: category
     *         schema: { type: 'string' }
     *       - in: query
     *         name: page
     *         schema: { type: 'integer' }
     *       - in: query
     *         name: limit
     *         schema: { type: 'integer' }
     *     responses:
     *       200:
     *         description: List of products
     */
    async getAllProducts(req: Request, res: Response) {
        try {
            const { search, category, page, limit } = req.query;
            const pageNum = parseInt(page as string) || 1;
            const limitNum = parseInt(limit as string) || 12;

            const result = await this.productService.getAllProducts(
                search as string | undefined, 
                category as string | undefined,
                pageNum,
                limitNum
            );
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /products/{id}:
     *   get:
     *     summary: Get product by ID
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: 'integer' }
     *     responses:
     *       200:
     *         description: Product found
     *       404:
     *         description: Product not found
     */
    async getProductById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id || "0");
            if (isNaN(id) || id === 0) {
                return res.status(400).json({ message: "Invalid product ID" });
            }
            const product = await this.productService.getProductById(id);
            if (!product) {
                throw new ProductNotFoundError();
            }
            res.status(200).json(product);
        } catch (error: any) {
            if (error instanceof ProductNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /products/{id}:
     *   put:
     *     summary: Update product
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: 'integer' }
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       200:
     *         description: Product updated successfully
     */
    async updateProduct(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id || "0");
            if (isNaN(id) || id === 0) {
                return res.status(400).json({ message: "Invalid product ID" });
            }
            const product = await this.productService.updateProduct(id, req.body);
            res.status(200).json(product);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * @swagger
     * /products/{id}:
     *   delete:
     *     summary: Delete product
     *     tags: [Products]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema: { type: 'integer' }
     *     responses:
     *       200:
     *         description: Product deleted successfully
     */
    async deleteProduct(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id || "0");
            if (isNaN(id) || id === 0) {
                return res.status(400).json({ message: "Invalid product ID" });
            }
            const result = await this.productService.deleteProduct(id);
            res.status(result.status).json({ message: result.message });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
