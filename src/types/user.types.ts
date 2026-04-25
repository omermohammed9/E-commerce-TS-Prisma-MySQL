import { UserRole } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength, IsBoolean } from 'class-validator';

export type UserAttributes = {
    id: number;
    username: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
    bio?: string;
    phoneNumber: string;
    address: string;
    socialLinks?: any;
    isActive: boolean;
    emailVerified: boolean;
    lastLogin: Date | null;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
};

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    passwordHash!: string;

    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber!: string;

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsOptional()
    @IsString()
    profilePicture?: string;

    @IsOptional()
    @IsString()
    bio?: string;
}

export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    profilePicture?: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;
}

export type userResponse = Pick<UserAttributes, 'id' | 'username' | 'email'>;