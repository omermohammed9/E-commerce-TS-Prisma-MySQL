import {UpdateOrderAttributes} from "../utils/updateOrderAttributes";
import {CreateOrderDTO, orderResponse, UpdateOrderDTO} from "../types/order.types";

export interface IOrderService{
    createOrder(orderDetails: CreateOrderDTO): Promise<orderResponse>;
    getAllOrders(): Promise<orderResponse[]>;
    getOrderById(orderId: number): Promise<orderResponse|null>;
    updateOrder(orderId: number, orderDetails: UpdateOrderDTO): Promise<UpdateOrderAttributes>;
    deleteOrder(orderId: number): Promise<{message: string; status: 200 | 404}>;
}