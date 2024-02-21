import {OrderDetail, PrismaClient} from '@prisma/client';

export class OrderDetailModel {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async findManyByOrderId(orderId: number) {
        // Here you would use the Prisma client to fetch multiple records based on orderId.
        return this.prisma.orderDetail.findMany({
            where: { orderId }
        });
    }

    async findOne(id: number) {
        // Fetch a single record based on the id.
        return this.prisma.orderDetail.findUnique({
            where: { id }
        });
    }

    async create(data: any): Promise<OrderDetail> {
        // Create a new record with the provided data.
        return this.prisma.orderDetail.create({ data });
    }

    async update(id: number, data: Partial<OrderDetail>) {
        // Update the record that matches the id with the new data.
        return this.prisma.orderDetail.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        // Delete the record with the specified id.
        return this.prisma.orderDetail.delete({ where: { id } });
    }
}
