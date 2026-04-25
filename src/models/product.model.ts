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

    async getAllProducts(search?: string, category?: string, page: number = 1, limit: number = 10): Promise<{ products: Product[], total: number }> {
        const skip = (page - 1) * limit;
        const where = {
            AND: [
                search ? {
                    OR: [
                        { name: { contains: search } },
                        { description: { contains: search } }
                    ]
                } : {},
                category ? { category: { equals: category } } : {}
            ]
        };

        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { id: 'desc' }
            }),
            this.prisma.product.count({ where })
        ]);

        return { products, total };
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
