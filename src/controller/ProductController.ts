import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";
import { IProductService } from "../interfaces/IProductService";

@injectable()
export class ProductController {
    private productService: IProductService;

    constructor(@inject(TYPES.IProductService) productService: IProductService) {
        this.productService = productService;
    }

    async createProduct(req: Request, res: Response) {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id || "0");
            if (isNaN(id) || id === 0) {
                return res.status(400).json({ message: "Invalid product ID" });
            }
            const product = await this.productService.getProductById(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

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
