import {CreateUserDTO, UpdateUserDTO, userResponse} from "../types/user.types";

import {User} from "@prisma/client";
import {UpdateUserAttributes} from "../utils/updateUserAttributes";

export interface IUserService {
    createUser(userDetails: CreateUserDTO): Promise<userResponse>;
    getUserById(userId: number): Promise<userResponse | null>;
    getUserByEmail(email: string): Promise<userResponse | null>;
    getAllUsers(): Promise<userResponse[]>;
    updateUser(userId: number, updateDetails: UpdateUserDTO): Promise<UpdateUserAttributes>;
    deleteUser(userId: number): Promise<{ message: string; status: 200 | 404  }>;

    login(email: string, password: string): Promise<{ user: User; token: string }>;
    changePassword(userId: number, oldPassword: string, newPassword: string): Promise<{ message: string }>;

    //checkUserExists(email: string): Promise<boolean
    //verifyUserPassword(email: string, password: string): Promise<boolean>;

}