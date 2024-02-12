import {CreateUserDTO, UpdateUserDTO} from "../types/user.types";
import {User as PrismaUser} from "@prisma/client";

export interface IUserModel {
    createUser(userDetails: CreateUserDTO): Promise<PrismaUser>;
    getUserById(userId: number): Promise<PrismaUser | null>;
    //getUserByEmail(email: string): Promise<PrismaUser | null>;
    getAllUsers(): Promise<PrismaUser[]>;
    updateUser(userId: number, updateDetails: UpdateUserDTO): Promise<PrismaUser>;
    deleteUser(userId: number): Promise<void>;
    //verifyUserPassword(email: string, password: string): Promise<boolean>;
    // Additional methods for profile management, permissions, etc.
}