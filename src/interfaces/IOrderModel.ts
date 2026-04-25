import {CreateOrderDTO, UpdateOrderDTO} from "../types/order.types";
import {Order as PrismaOrder} from "@prisma/client";
export interface IOrderModel {
    createOrder(order: CreateOrderDTO): Promise<PrismaOrder>;
    getAllOrders(skip: number, take: number): Promise<{ orders: PrismaOrder[]; total: number }>;
    getOrderById(orderId: number): Promise<PrismaOrder | null>;
    getOrdersByUserId(userId: number, skip: number, take: number): Promise<{ orders: PrismaOrder[]; total: number }>;
    updateOrder(orderId: number, order: UpdateOrderDTO): Promise<PrismaOrder>;
    deleteOrder(orderId: number): Promise<void>;
}