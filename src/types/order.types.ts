// Define a type for Order attributes
export type OrderAttributes = {
    id: number;
    customerName: string;
    customerEmail: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
};

// Define a type for creating an Order, omitting the auto-generated fields like id, createdAt, and updatedAt
export type CreateOrderDTO = Omit<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'>;

// Define a type for updating an Order, making all attributes optional and omitting the id
export type UpdateOrderDTO = Partial<Omit<OrderAttributes, 'id'>>;
