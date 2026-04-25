import express from 'express';
import path from 'path';
import { ProductController } from "../controller/ProductController";
import { TYPES } from "../types/types";
import { Container } from "inversify";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateProductDTO, UpdateProductDTO } from "../types/product.types";
import auth from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";
import { upload } from "../middleware/upload";
import sharp from 'sharp';
import fs from 'fs';

export class productRoutes {
    public router: express.Router;
    private container: Container;

    constructor(container: Container) {
        this.container = container;
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        const productController = this.container.get<ProductController>(TYPES.ProductController);
        
        // Public routes
        this.router.get('/', (req, res) => productController.getAllProducts(req, res));
        this.router.get('/:id', (req, res) => productController.getProductById(req, res));

        // Admin routes
        this.router.post('/', auth, isAdmin, validationMiddleware(CreateProductDTO), (req, res) => productController.createProduct(req, res));
        this.router.put('/:id', auth, isAdmin, validationMiddleware(UpdateProductDTO), (req, res) => productController.updateProduct(req, res));
        this.router.delete('/:id', auth, isAdmin, (req, res) => productController.deleteProduct(req, res));
        
        // Image Upload
        this.router.post('/upload', auth, isAdmin, upload.single('image'), async (req: any, res) => {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
            
            const filePath = req.file.path;
            const fileName = `proc-${req.file.filename}`;
            const outPath = path.join(path.dirname(filePath), fileName);

            try {
                await sharp(filePath)
                    .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(outPath);

                // Delete original file
                fs.unlinkSync(filePath);

                const imageUrl = `/uploads/products/${fileName}`;
                res.status(200).json({ imageUrl });
            } catch (error) {
                console.error('Sharp error:', error);
                res.status(500).json({ message: 'Error processing image' });
            }
        });
    }
}


