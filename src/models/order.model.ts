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
        return prisma.order.create({ 
            data,
            include: {
                orderDetails: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    async getAllOrders(skip: number, take: number): Promise<{ orders: PrismaOrder[]; total: number }> {
        const [orders, total] = await Promise.all([
            prisma.order.findMany({ skip, take }),
            prisma.order.count()
        ]);
        return { orders, total };
    }

    async getOrderById(id: number): Promise<PrismaOrder | null> {
        return prisma.order.findUnique({ 
            where: { id },
            include: {
                orderDetails: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    async getOrdersByUserId(userId: number, skip: number, take: number): Promise<{ orders: PrismaOrder[]; total: number }> {
        const [orders, total] = await Promise.all([
            prisma.order.findMany({ where: { userId }, skip, take }),
            prisma.order.count({ where: { userId } })
        ]);
        return { orders, total };
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
