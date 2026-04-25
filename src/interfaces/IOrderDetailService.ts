import { OrderDetail } from "@prisma/client";
import { CreateOrderDetailDTO, UpdateOrderDetailDTO } from "../types/orderDetail.types";

export interface IOrderDetailService {
    getOrderDetails(orderId: number): Promise<OrderDetail[]>;
    getOrderDetailById(id: number): Promise<OrderDetail | null>;
    addOrderDetail(orderDetailData: CreateOrderDetailDTO): Promise<OrderDetail>;
    updateOrderDetail(id: number, orderDetailData: UpdateOrderDetailDTO): Promise<OrderDetail>;
    deleteOrderDetail(id: number): Promise<OrderDetail>;
}
