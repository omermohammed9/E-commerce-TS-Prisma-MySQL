import { OrderModel, Order } from '../models/order.model';
import {CreateOrderDTO, UpdateOrderDTO} from "../types/order.types";

class OrderService {
    private orderModel: OrderModel;

    constructor(orderModel: OrderModel) {
        this.orderModel = orderModel;
    }

    public async getAllOrders(): Promise<Order[]> {
        // Get all orders
        return this.orderModel.findMany();
    }

    public async getOrderById(id: number): Promise<Order | null> {
        // Get an order by id
        return await this.orderModel.findOne(id);
    }


    public async createOrder(orderData:CreateOrderDTO): Promise<Order> {
        // Create a new order
        return this.orderModel.create( {
            ...orderData,

        });
    }

    public async updateOrder(id: number, orderData: UpdateOrderDTO): Promise<Order> {
        // Update an existing order
        return await this.orderModel.update(id, orderData);
    }

    public async deleteOrder(id: number): Promise<Order | null> {
        // Delete an order
        return await this.orderModel.delete(id);
    }
}

export default OrderService;
