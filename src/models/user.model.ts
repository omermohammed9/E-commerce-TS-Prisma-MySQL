import {PrismaClient, User as PrismaUser,} from "@prisma/client";
import {CreateUserDTO, UpdateUserDTO} from "../types/user.types";
import {IUserModel} from "../interfaces/IUserModel";
import {injectable} from "inversify";
import {UserNotFoundError} from "../utils/ErrorTypes";


@injectable()
export class UserModel implements IUserModel {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createUser(data: CreateUserDTO): Promise<PrismaUser> {
        return this.prisma.user.create({ data });
    }
    async getAllUsers(): Promise<PrismaUser[]> {
        return this.prisma.user.findMany();
    }
    async getUserById(id: number): Promise<PrismaUser | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async getUserByEmail(email: string): Promise<PrismaUser | null> {
        // Fetch a single record based on the email.
        return this.prisma.user.findUnique({ where: { email } });
    }
    async updateUser(id: number, data: UpdateUserDTO): Promise<PrismaUser> {
        return this.prisma.user.update({
            where: {id},
            data,
        });
    }
    async deleteUser(id: number): Promise<void> {
        const user = await this.getUserById( id );
        if (!user) {
            throw new UserNotFoundError(`User with id ${id} not found`);
        }
        await this.prisma.user.delete({ where: { id } });

    };
    async changePassword(id: number, newPassword: string): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: { passwordHash: newPassword},
        });
    };
    async updateLastLogin(id: number): Promise<void> {
        await this.prisma.user.update({
            where: { id: id },
            data: { lastLogin: new Date()},
        });
    }
}
