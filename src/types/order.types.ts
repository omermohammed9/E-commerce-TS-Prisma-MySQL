// Define a type for Order attributes
import {OrderStatus, PaymentStatus} from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/binary";



export type OrderAttributes = {
    id: number;
    userId: number;
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
    // Include optional fields if necessary
    shippingAddress: string | null;
    billingAddress: string | null;
    paymentMethod: string | null;
    paymentDetails : JsonObject; // use a more specific type if possible
    trackingNumber: string;
    shippedAt: Date | null;
    deliveredAt: Date | null;

};

// Define a type for creating an Order, omitting the auto-generated fields like id, createdAt, and updatedAt
export type CreateOrderDTO = Omit<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'>;

// Define a type for updating an Order, making all attributes optional and omitting the id
export type UpdateOrderDTO = Partial<Omit<OrderAttributes, 'id'>>;


export type orderResponse = Pick<OrderAttributes,   |'id'
    | 'totalAmount' | 'status' | 'paymentStatus' | 'paymentDetails' | 'paymentMethod' | 'billingAddress' |  'shippingAddress' | 'shippedAt' | 'deliveredAt'>;
