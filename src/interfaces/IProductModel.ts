import { Product } from "@prisma/client";
import { CreateProductDTO, UpdateProductDTO } from "../types/product.types";

export interface IProductModel {
    createProduct(data: CreateProductDTO): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product | null>;
    updateProduct(id: number, data: UpdateProductDTO): Promise<Product>;
    deleteProduct(id: number): Promise<void>;
}
