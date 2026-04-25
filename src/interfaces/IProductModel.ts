import { Product } from "@prisma/client";
import { CreateProductDTO, UpdateProductDTO } from "../types/product.types";

export interface IProductModel {
    createProduct(data: CreateProductDTO): Promise<Product>;
    getAllProducts(search?: string, category?: string, page?: number, limit?: number): Promise<{ products: Product[], total: number }>;
    getProductById(id: number): Promise<Product | null>;
    updateProduct(id: number, data: UpdateProductDTO): Promise<Product>;
    deleteProduct(id: number): Promise<void>;
}
