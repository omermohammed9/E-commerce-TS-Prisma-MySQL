import { PrismaClient, Product } from "@prisma/client";
import { CreateProductDTO, UpdateProductDTO } from "../types/product.types";
import { IProductModel } from "../interfaces/IProductModel";
import { injectable } from "inversify";
import prisma from "../utils/prismaClient";

@injectable()
export class ProductModel implements IProductModel {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async createProduct(data: CreateProductDTO): Promise<Product> {
        return this.prisma.product.create({ data });
    }

    async getAllProducts(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    async getProductById(id: number): Promise<Product | null> {
        return this.prisma.product.findUnique({ where: { id } });
    }

    async updateProduct(id: number, data: UpdateProductDTO): Promise<Product> {
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }

    async deleteProduct(id: number): Promise<void> {
        await this.prisma.product.delete({ where: { id } });
    }
}
