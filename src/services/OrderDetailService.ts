import { injectable, inject } from "inversify";
import { IOrderDetailModel } from '../interfaces/IOrderDetailModel';
import { IOrderDetailService } from "../interfaces/IOrderDetailService";
import { CreateOrderDetailDTO, UpdateOrderDetailDTO } from "../types/orderDetail.types";
import { OrderDetail } from "@prisma/client";
import { TYPES } from "../types/types";

@injectable()
class OrderDetailService implements IOrderDetailService {
    private orderDetailModel: IOrderDetailModel;

    constructor(@inject(TYPES.IOrderDetailModel) orderDetailModel: IOrderDetailModel) {
        this.orderDetailModel = orderDetailModel;
    }

    public async getOrderDetails(orderId: number): Promise<OrderDetail[]> {
        return this.orderDetailModel.findManyByOrderId(orderId);
    }

    public async getOrderDetailById(id: number): Promise<OrderDetail | null> {
        return this.orderDetailModel.findOne(id);
    }

    public async addOrderDetail(orderDetailData: CreateOrderDetailDTO): Promise<OrderDetail> {
        return this.orderDetailModel.create(orderDetailData);
    }

    public async updateOrderDetail(id: number, orderDetailData: UpdateOrderDetailDTO): Promise<OrderDetail> {
        return await this.orderDetailModel.update(id, orderDetailData);
    }

    public async deleteOrderDetail(id: number): Promise<OrderDetail> {
        return await this.orderDetailModel.delete(id);
    }
}

export default OrderDetailService;

