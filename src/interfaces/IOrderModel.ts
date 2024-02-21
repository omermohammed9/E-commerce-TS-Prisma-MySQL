import {CreateOrderDTO, UpdateOrderDTO} from "../types/order.types";
import {Order as PrismaOrder} from "@prisma/client";
export interface IOrderModel {
    createOrder(order: CreateOrderDTO): Promise<PrismaOrder>;
    getAllOrders(): Promise<PrismaOrder[]>;
    getOrderById(orderId: number): Promise<PrismaOrder | null>;
    updateOrder(orderId: number, order: UpdateOrderDTO): Promise<PrismaOrder>;
    deleteOrder(orderId: number): Promise<void>;
}