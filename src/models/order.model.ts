import {PrismaClient, Order as PrismaOrder} from '@prisma/client';
import {CreateOrderDTO, UpdateOrderDTO} from "../types/order.types";
import {injectable} from "inversify";
import {IOrderModel} from "../interfaces/IOrderModel";


@injectable()
export class OrderModel implements IOrderModel {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async createOrder(data: CreateOrderDTO): Promise<PrismaOrder> {
        // Create a new record with the provided data.
        return this.prisma.order.create({data});
    }

    async getAllOrders(): Promise<PrismaOrder[]> {
        // Here you would use the Prisma client to fetch multiple records.
        return this.prisma.order.findMany();
    }

    async getOrderById(id: number): Promise<PrismaOrder | null> {
        // Fetch a single record based on the id.
        return this.prisma.order.findUnique({ where: { id } });
    }

    async updateOrder(id: number, data: UpdateOrderDTO): Promise<PrismaOrder> {
        // Update the record that matches the id with the new data.
        return this.prisma.order.update({where: { id }, data});
    }

    async deleteOrder(id: number): Promise<void> {
        // Check if the record exists
        const record = await this.getOrderById(id);

        if (record) {
            // Record exists, proceed to delete
             this.prisma.order.delete({where: { id },
            });
        } else {
            // Record does not exist, handle accordingly
            throw new Error(`Order with ID ${id} not found.`);
            // return null;
        }
    }
}
