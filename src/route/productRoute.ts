import express from 'express';
import { ProductController } from "../controller/ProductController";
import { TYPES } from "../types/types";
import { Container } from "inversify";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateProductDTO, UpdateProductDTO } from "../types/product.types";

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
        this.router.post('/', validationMiddleware(CreateProductDTO), (req, res) => productController.createProduct(req, res));
        this.router.get('/', (req, res) => productController.getAllProducts(req, res));
        this.router.get('/:id', (req, res) => productController.getProductById(req, res));
        this.router.put('/:id', validationMiddleware(UpdateProductDTO), (req, res) => productController.updateProduct(req, res));
        this.router.delete('/:id', (req, res) => productController.deleteProduct(req, res));
    }
}

