import {CreateUserDTO, UpdateUserDTO} from "../types/user.types";
import {userResponse} from "../types/userResponse";

export interface IUserService {
    createUser(userDetails: CreateUserDTO): Promise<userResponse>;
    getUserById(userId: number): Promise<userResponse | null>;
    //getUserByEmail(email: string): Promise<userResponse>;
    getAllUsers(): Promise<userResponse[]>;
    updateUser(userId: number, updateDetails: UpdateUserDTO): Promise<userResponse>;
    deleteUser(userId: number): Promise<{ message: string; status: 200 | 404  }>;
    //verifyUserPassword(email: string, password: string): Promise<boolean>;
    //Additional methods for profile management, permissions, etc.
}