// Define a type for Order attributes
import {OrderStatus, PaymentStatus} from "@prisma/client";

export type OrderAttributes = {
    id: number;
    userId: number;
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
    // Include optional fields if necessary
    shippingAddress?: string;
    billingAddress?: string;
    paymentMethod?: string;
    paymentDetails?: any; // use a more specific type if possible
    trackingNumber?: string;
    shippedAt?: Date;
    deliveredAt?: Date;
};

// Define a type for creating an Order, omitting the auto-generated fields like id, createdAt, and updatedAt
export type CreateOrderDTO = Omit<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'>;

// Define a type for updating an Order, making all attributes optional and omitting the id
export type UpdateOrderDTO = Partial<Omit<OrderAttributes, 'id'>>;
