import {CreateUserDTO, UpdateUserDTO} from "../types/user.types";
import {User as PrismaUser} from "@prisma/client";

export interface IUserModel {
    createUser(userDetails: CreateUserDTO): Promise<PrismaUser>;
    getAllUsers(): Promise<PrismaUser[]>;
    getUserById(userId: number): Promise<PrismaUser | null>;
    getUserByEmail(email: string): Promise<PrismaUser | null>;
    updateUser(userId: number, updateDetails: UpdateUserDTO): Promise<PrismaUser>;
    deleteUser(userId: number): Promise<void>;
    changePassword(userId: number,  newPassword: string): Promise<void>;
    //checkUserExists(email: string): Promise<boolean>;
    //login(email: string, password: string): Promise<{ user: PrismaUser; token: string }>;
    //verifyUserPassword(email: string, password: string): Promise<boolean>;
}