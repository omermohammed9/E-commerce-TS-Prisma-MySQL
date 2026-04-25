import { Product } from "@prisma/client";
import { CreateProductDTO, UpdateProductDTO } from "../types/product.types";
import { IProductService } from "../interfaces/IProductService";
import { IProductModel } from "../interfaces/IProductModel";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";

@injectable()
export class ProductService implements IProductService {
    private productModel: IProductModel;

    constructor(@inject(TYPES.IProductModel) productModel: IProductModel) {
        this.productModel = productModel;
    }

    async createProduct(data: CreateProductDTO): Promise<Product> {
        return this.productModel.createProduct(data);
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productModel.getAllProducts();
    }

    async getProductById(id: number): Promise<Product | null> {
        return this.productModel.getProductById(id);
    }

    async updateProduct(id: number, data: UpdateProductDTO): Promise<Product> {
        return this.productModel.updateProduct(id, data);
    }

    async deleteProduct(id: number): Promise<{ message: string; status: number }> {
        try {
            await this.productModel.deleteProduct(id);
            return { message: "Product deleted successfully", status: 200 };
        } catch (error) {
            return { message: "Failed to delete product", status: 500 };
        }
    }
}
