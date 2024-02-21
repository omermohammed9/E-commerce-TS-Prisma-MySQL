import {CreateOrderDTO, orderResponse, UpdateOrderDTO} from "../types/order.types";
import {IOrderService} from "../interfaces/IOrderService";
import {IOrderModel} from "../interfaces/IOrderModel";
import {inject, injectable} from "inversify";
import {TYPES} from "../types/types";
import {UpdateOrderAttributes} from "../utils/updateOrderAttributes";
import {findUpdateDifference} from "../utils/findUpdateDifference";
import {OrderNotFoundError} from "../utils/ErrorTypes";
import {formatOrderResponse} from "../utils/formatOrderResponse";

@injectable()
export class OrderService implements IOrderService {
    private orderModel: IOrderModel;

    constructor(@inject(TYPES.IOrderModel) orderModel: IOrderModel) {
        this.orderModel = orderModel;
    }

    public async createOrder(orderData:CreateOrderDTO): Promise<orderResponse > {
        // Create a new order
        const newOrder = await this.orderModel.createOrder(orderData);
        return formatOrderResponse(newOrder)
    }

    public async getAllOrders(): Promise<orderResponse[]> {
        const orders = await this.orderModel.getAllOrders();
        if (!orders) return [];
        return orders.map(formatOrderResponse);
    }


    public async getOrderById(id: number): Promise<orderResponse | null> {
        // Get an order by id
        const order = await this.orderModel.getOrderById(id);
        if (!order) return null;
        return formatOrderResponse(order);
    }

    public async updateOrder(id: number, orderData: UpdateOrderDTO): Promise<UpdateOrderAttributes> {
        const originalOrder = await this.orderModel.getOrderById(id);
        if (!originalOrder) {
            throw new Error(`Order with ID ${id} not found`);
        }
        const updatedOrder = await this.orderModel.updateOrder(id, orderData);
        const difference = findUpdateDifference(originalOrder, updatedOrder);
        return {original: originalOrder, updated: difference};
    }

    public async deleteOrder(id: number): Promise<{ message: string; status: 200 | 404 }> {
        // Delete an order
        try {
            await this.orderModel.deleteOrder(id);
            return {
                message: `Order deleted successfully`,
                status: 200
            };

        }
        catch (error) {
            if (error instanceof OrderNotFoundError){
                return {
                    message: error.message,
                    status: 404
                };
            }
            throw error;
        }
    }
}


