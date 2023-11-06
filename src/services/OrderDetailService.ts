import { OrderDetailModel, OrderDetail } from '../models/orderDetail.model';

class OrderDetailService {
    private orderDetailModel: OrderDetailModel;

    constructor(orderDetailModel: OrderDetailModel) {
        this.orderDetailModel = orderDetailModel;
    }

    public async getOrderDetails(orderId: number): Promise<OrderDetail[]> {
        // Get all order details for a specific order
        return this.orderDetailModel.findManyByOrderId(orderId);
    }

    public async getOrderDetailById(id: number): Promise<OrderDetail | null> {
        // Get a single order detail by id
        return this.orderDetailModel.findOne(id);
    }

    public async addOrderDetail(orderDetailData: Partial<OrderDetail>): Promise<OrderDetail> {
        // Add a new order detail
        return this.orderDetailModel.create(orderDetailData);
    }

    public async updateOrderDetail(id: number, orderDetailData: Partial<OrderDetail>): Promise<OrderDetail> {
        // Update an existing order detail
        return await this.orderDetailModel.update(id, orderDetailData);
    }

    public async deleteOrderDetail(id: number): Promise<OrderDetail> {
        // Delete an order detail
        return await this.orderDetailModel.delete(id);
    }
}

export default OrderDetailService;
