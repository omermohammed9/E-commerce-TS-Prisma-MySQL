import {Order as PrismaOrder} from "@prisma/client";

export interface UpdateOrderAttributes {
    original: PrismaOrder | null;
    updated: Partial<PrismaOrder>;
}