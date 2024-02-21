import { orderResponse} from "../types/order.types";
import {Order} from "@prisma/client";

export function formatOrderResponse(order: Order): orderResponse {
    return {
        paymentMethod: order.paymentMethod,
        id: order.id,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentDetails: order.paymentDetails || JSON.parse(order.paymentDetails as string),
        billingAddress: order.billingAddress,
        shippingAddress: order.shippingAddress,
        shippedAt: order.shippedAt,
        deliveredAt: order.deliveredAt
    };
}
