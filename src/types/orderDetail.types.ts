// Define a type for OrderDetail attributes
export type OrderDetailAttributes = {
    id: number;
    orderId: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
};

// Define a type for creating an OrderDetail, omitting the auto-generated fields like id, createdAt, and updatedAt
export type CreateOrderDetailDTO = Omit<OrderDetailAttributes, 'id' | 'createdAt' | 'updatedAt'>;

// Define a type for updating an OrderDetail, making all attributes optional and omitting the id
export type UpdateOrderDetailDTO = Partial<Omit<OrderDetailAttributes, 'id'>>;
