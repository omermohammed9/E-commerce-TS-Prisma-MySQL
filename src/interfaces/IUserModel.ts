import {CreateUserDTO, UpdateUserDTO} from "../types/user.types";
import {Prisma, User as PrismaUser} from "@prisma/client";

export interface IUserModel {
    createUser(userDetails: Prisma.UserCreateInput): Promise<PrismaUser>;
    getAllUsers(): Promise<PrismaUser[]>;
    getUserById(userId: number): Promise<PrismaUser | null>;
    getUserByEmail(email: string): Promise<PrismaUser | null>;
    updateUser(userId: number, updateDetails: UpdateUserDTO): Promise<PrismaUser>;
    deleteUser(userId: number): Promise<void>;
    changePassword(userId: number,  newPassword: string): Promise<void>;
    updateLastLogin(userId: number): Promise<void>;
    createRefreshToken(userId: number, token: string, expiresAt: Date): Promise<void>;
    findRefreshToken(token: string): Promise<any>;
    revokeRefreshToken(token: string): Promise<void>;
    revokeAllUserRefreshTokens(userId: number): Promise<void>;
    updateEmailVerification(userId: number, verified: boolean): Promise<void>;
    deleteExpiredRefreshTokens(): Promise<number>;
}