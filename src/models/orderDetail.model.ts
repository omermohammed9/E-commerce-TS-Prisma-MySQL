import { OrderDetail, PrismaClient } from '@prisma/client';
import { injectable } from "inversify";
import { IOrderDetailModel } from "../interfaces/IOrderDetailModel";
import { CreateOrderDetailDTO, UpdateOrderDetailDTO } from "../types/orderDetail.types";
import prisma from "../utils/prismaClient";

@injectable()
export class OrderDetailModel implements IOrderDetailModel {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = prisma;
    }

    async findManyByOrderId(orderId: number): Promise<OrderDetail[]> {
        return this.prisma.orderDetail.findMany({
            where: { orderId }
        });
    }

    async findOne(id: number): Promise<OrderDetail | null> {
        return this.prisma.orderDetail.findUnique({
            where: { id }
        });
    }

    async create(data: CreateOrderDetailDTO): Promise<OrderDetail> {
        return this.prisma.orderDetail.create({ data });
    }

    async update(id: number, data: UpdateOrderDetailDTO): Promise<OrderDetail> {
        return this.prisma.orderDetail.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<OrderDetail> {
        return this.prisma.orderDetail.delete({ where: { id } });
    }
}

