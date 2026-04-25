import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUrl, Min } from 'class-validator';

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsNumber()
    @Min(0)
    stockQuantity!: number;

    @IsString()
    @IsNotEmpty()
    image!: string;

    @IsOptional()
    @IsString()
    category?: string;
}

export class UpdateProductDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    stockQuantity?: number;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    category?: string;
}
