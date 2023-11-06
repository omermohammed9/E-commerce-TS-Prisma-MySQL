import {PrismaClient, Order as PrismaOrder, OrderStatus, PaymentStatus, Prisma} from '@prisma/client';

export type Order = {
    id: number;
    userId: number; // Assuming userId is a number
    totalAmount: number; // Assuming totalAmount is a number
    status : OrderStatus; // Replace string with your actual OrderStatus type
    paymentStatus: PaymentStatus; // Replace string with your actual PaymentStatus type
    createdAt: Date;
    updatedAt: Date;
};

export class OrderModel {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async findMany(): Promise<PrismaOrder[]> {
        // Here you would use the Prisma client to fetch multiple records.
        return this.prisma.order.findMany();
    }

    async findOne(id: number): Promise<PrismaOrder | null> {
        // Fetch a single record based on the id.
        return this.prisma.order.findUnique({ where: { id } });
    }

    async create(data: Prisma.OrderCreateInput): Promise<PrismaOrder> {
        // Create a new record with the provided data.
        return this.prisma.order.create({ data });
    }

    async update(id: number, data: Prisma.OrderUpdateInput): Promise<PrismaOrder> {
        // Update the record that matches the id with the new data.
        return this.prisma.order.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<Order | null> {
        // Check if the record exists
        const record = await this.prisma.order.findUnique({
            where: { id },
        });

        if (record) {
            // Record exists, proceed to delete
            return this.prisma.order.delete({
                where: { id },
            });
        } else {
            // Record does not exist, handle accordingly
            // You might want to throw an error or return null
            throw new Error(`Order with ID ${id} not found.`);
            // Or return null to indicate no record was found to delete
            // return null;
        }
    }
}
