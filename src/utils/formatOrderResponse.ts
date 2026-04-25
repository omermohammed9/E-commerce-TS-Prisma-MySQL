import { orderResponse} from "../types/order.types";
import {Order} from "@prisma/client";

export function formatOrderResponse(order: any): orderResponse {
    return {
        paymentMethod: order.paymentMethod,
        id: order.id,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentDetails: order.paymentDetails,
        billingAddress: order.billingAddress,
        shippingAddress: order.shippingAddress,
        shippedAt: order.shippedAt,
        deliveredAt: order.deliveredAt,
        userId: order.userId,
        createdAt: order.createdAt,
        items: order.orderDetails?.map((detail: any) => ({
            productId: detail.productId,
            productName: detail.product?.name,
            productImage: detail.product?.image,
            quantity: detail.quantity,
            price: detail.price
        }))
    };
}
