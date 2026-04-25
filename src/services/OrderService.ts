import { CreateOrderDTO, orderResponse, UpdateOrderDTO, PaginatedOrderResponse } from "../types/order.types";
import { IOrderService } from "../interfaces/IOrderService";
import { IOrderModel } from "../interfaces/IOrderModel";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/types";
import { UpdateOrderAttributes } from "../utils/updateOrderAttributes";
import { findUpdateDifference } from "../utils/findUpdateDifference";
import { OrderNotFoundError } from "../utils/ErrorTypes";
import { formatOrderResponse } from "../utils/formatOrderResponse";
import { Order } from "@prisma/client";
import prisma from "../utils/prismaClient";

@injectable()
export class OrderService implements IOrderService {
    private orderModel: IOrderModel;

    constructor(@inject(TYPES.IOrderModel) orderModel: IOrderModel) {
        this.orderModel = orderModel;
    }

    public async createOrder(orderData: CreateOrderDTO): Promise<orderResponse> {
        const { items, ...orderInfo } = orderData;

        // Perform the entire checkout process in an atomic transaction
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create the Order and its associated OrderDetails
            const newOrder = await tx.order.create({
                data: {
                    ...orderInfo,
                    orderDetails: {
                        create: items.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                },
                include: {
                    orderDetails: true
                }
            });

            // 2. Validate stock and decrement for each product
            for (const item of items) {
                const product = await tx.product.findUnique({
                    where: { id: item.productId }
                });

                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }

                if (product.stockQuantity < item.quantity) {
                    throw new Error(`Insufficient stock for product: ${product.name}. Requested: ${item.quantity}, Available: ${product.stockQuantity}`);
                }

                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stockQuantity: {
                            decrement: item.quantity
                        }
                    }
                });
            }

            return newOrder;
        });

        return formatOrderResponse(result);
    }

    public async getAllOrders(page: number, limit: number): Promise<PaginatedOrderResponse> {
        const skip = (page - 1) * limit;
        const { orders, total } = await this.orderModel.getAllOrders(skip, limit);
        
        return {
            orders: orders.map(formatOrderResponse),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

    public async getOrderById(id: number): Promise<orderResponse | null> {
        const order = await this.orderModel.getOrderById(id);
        if (!order) return null;
        return formatOrderResponse(order);
    }

    public async getOrdersByUserId(userId: number, page: number, limit: number): Promise<PaginatedOrderResponse> {
        const skip = (page - 1) * limit;
        const { orders, total } = await this.orderModel.getOrdersByUserId(userId, skip, limit);
        
        return {
            orders: orders.map(formatOrderResponse),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

    public async updateOrder(id: number, orderData: UpdateOrderDTO): Promise<UpdateOrderAttributes> {
        const originalOrder = await this.orderModel.getOrderById(id);
        if (!originalOrder) {
            throw new Error(`Order with ID ${id} not found`);
        }
        const updatedOrder = await this.orderModel.updateOrder(id, orderData);
        const difference = findUpdateDifference(originalOrder, updatedOrder);
        return { original: originalOrder, updated: difference };
    }

    public async deleteOrder(id: number): Promise<{ message: string; status: 200 | 404 }> {
        try {
            await this.orderModel.deleteOrder(id);
            return {
                message: `Order deleted successfully`,
                status: 200
            };
        } catch (error) {
            if (error instanceof OrderNotFoundError) {
                return {
                    message: error.message,
                    status: 404
                };
            }
            throw error;
        }
    }
}
