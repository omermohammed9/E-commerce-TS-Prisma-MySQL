import { OrderDetail } from '@prisma/client';
import { CreateOrderDetailDTO, UpdateOrderDetailDTO } from "../types/orderDetail.types";

export interface IOrderDetailModel {
    findManyByOrderId(orderId: number): Promise<OrderDetail[]>;
    findOne(id: number): Promise<OrderDetail | null>;
    create(data: CreateOrderDetailDTO): Promise<OrderDetail>;
    update(id: number, data: UpdateOrderDetailDTO): Promise<OrderDetail>;
    delete(id: number): Promise<OrderDetail>;
}
