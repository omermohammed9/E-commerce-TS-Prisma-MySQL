import { Order as PrismaOrder } from '@prisma/client';
import { CreateOrderDTO, UpdateOrderDTO } from "../types/order.types";
import { injectable } from "inversify";
import { IOrderModel } from "../interfaces/IOrderModel";
import prisma from "../utils/prismaClient";

@injectable()
export class OrderModel implements IOrderModel {

    constructor() {
    }

    async createOrder(data: CreateOrderDTO): Promise<PrismaOrder> {
        return prisma.order.create({ data });
    }

    async getAllOrders(): Promise<PrismaOrder[]> {
        return prisma.order.findMany();
    }

    async getOrderById(id: number): Promise<PrismaOrder | null> {
        return prisma.order.findUnique({ where: { id } });
    }

    async updateOrder(id: number, data: UpdateOrderDTO): Promise<PrismaOrder> {
        return prisma.order.update({ where: { id }, data });
    }

    async deleteOrder(id: number): Promise<void> {
        const record = await this.getOrderById(id);
        if (record) {
            await prisma.order.delete({ where: { id } });
        } else {
            throw new Error(`Order with ID ${id} not found.`);
        }
    }
}
