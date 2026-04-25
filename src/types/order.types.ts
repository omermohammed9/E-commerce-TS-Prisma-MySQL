import { OrderStatus, PaymentStatus } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export type OrderAttributes = {
    id: number;
    userId: number;
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
    shippingAddress: string | null;
    billingAddress: string | null;
    paymentMethod: string | null;
    paymentDetails : any;
    trackingNumber: string | null;
    shippedAt: Date | null;
    deliveredAt: Date | null;
};

export class OrderItemDTO {
    @IsNumber()
    @IsNotEmpty()
    productId!: number;

    @IsNumber()
    @Min(1)
    quantity!: number;

    @IsNumber()
    @Min(0)
    price!: number;
}

export class CreateOrderDTO {
    @IsNumber()
    @IsNotEmpty()
    userId!: number;

    @IsNumber()
    @Min(0)
    totalAmount!: number;

    @IsString()
    @IsNotEmpty()
    status!: OrderStatus;

    @IsString()
    @IsNotEmpty()
    paymentStatus!: PaymentStatus;

    @IsOptional()
    @IsString()
    shippingAddress?: string;

    @IsOptional()
    @IsString()
    billingAddress?: string;

    @IsOptional()
    @IsString()
    paymentMethod?: string;

    @IsOptional()
    paymentDetails?: any;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items!: OrderItemDTO[];
}

export class UpdateOrderDTO {
    @IsOptional()
    @IsString()
    status?: OrderStatus;

    @IsOptional()
    @IsString()
    paymentStatus?: PaymentStatus;

    @IsOptional()
    @IsString()
    shippingAddress?: string;

    @IsOptional()
    @IsString()
    billingAddress?: string;

    @IsOptional()
    @IsString()
    trackingNumber?: string;
}

export type orderResponse = Pick<OrderAttributes, 'id' | 'totalAmount' | 'status' | 'paymentStatus' | 'paymentDetails' | 'paymentMethod' | 'billingAddress' | 'shippingAddress' | 'shippedAt' | 'deliveredAt'>;
