import {UpdateOrderAttributes} from "../utils/updateOrderAttributes";
import {CreateOrderDTO, orderResponse, UpdateOrderDTO, PaginatedOrderResponse} from "../types/order.types";

export interface IOrderService{
    createOrder(orderDetails: CreateOrderDTO): Promise<orderResponse>;
    getAllOrders(page: number, limit: number): Promise<PaginatedOrderResponse>;
    getOrderById(orderId: number): Promise<orderResponse|null>;
    getOrdersByUserId(userId: number, page: number, limit: number): Promise<PaginatedOrderResponse>;
    updateOrder(orderId: number, orderDetails: UpdateOrderDTO): Promise<UpdateOrderAttributes>;
    deleteOrder(orderId: number): Promise<{message: string; status: 200 | 404}>;
}