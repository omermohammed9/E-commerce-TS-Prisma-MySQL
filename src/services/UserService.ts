import {User} from "@prisma/client";
import {CreateUserDTO, UpdateUserDTO, userResponse} from "../types/user.types";
import {signJwt} from "../utils/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {hashPassword} from "../utils/passwordUtils";
import {inject, injectable} from "inversify";
import {TYPES} from "../types/types";
import {IUserModel} from "../interfaces/IUserModel";
import {IUserService} from "../interfaces/IUserService";
import {UserNotFoundError} from "../utils/ErrorTypes";
import {findUpdateDifference} from "../utils/findUpdateDifference";
import {UpdateUserAttributes} from "../utils/updateUserAttributes";
import {verifyEmail} from "../utils/emailverifier";
import {validatePhoneNumber} from "../utils/phoneNumberValidation";


@injectable()
export class UserService implements IUserService {
    private userModel: IUserModel;

    constructor(@inject(TYPES.IUserModel)userModel: IUserModel) {
        this.userModel = userModel;
    };
    public async createUser(user: CreateUserDTO): Promise<userResponse > {
        const hashedPassword =  hashPassword(user.passwordHash);
        const emailExists = await verifyEmail(user.email, process.env.HUNTER_API_KEY || 'no API key');
        const isPhoneNumberValid = validatePhoneNumber(user.phoneNumber);
        console.log(isPhoneNumberValid);
        if (!isPhoneNumberValid) {
            throw new Error('Invalid phone number');
        }
        console.log(emailExists.data.result);
        console.log(emailExists.data.status);
        if (emailExists.data.result !== 'deliverable' || emailExists.data.status !== 'valid') {
            throw new Error('Invalid email address');
        }
        const newUser = await this.userModel.createUser(
            {
                ...user,
                passwordHash: hashedPassword
            }
        );
        const {passwordHash, ...userWithoutPassword} = newUser;
        return userWithoutPassword;
    };
    public async getAllUsers(): Promise<userResponse[]> {
        return this.userModel.getAllUsers();
    };


    public async getUserById(id: number): Promise<userResponse | null> {
        const user = await this.userModel.getUserById(id);
        if (!user) {
            return null;
        }
        // Transform the User object to userResponse format
        const response: userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        return response;
    };
    public async getUserByEmail(email: string): Promise<userResponse | null> {
        const user = await this.userModel.getUserByEmail(email);
        if (!user) {
            return null;
        }
        // Transform the User object to userResponse format
        const response: userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        return response;
    };

    public async updateUser(id: number, user: UpdateUserDTO): Promise<UpdateUserAttributes> {
        // Fetch original user
        const originalUser = await this.userModel.getUserById(id);
        if (!originalUser) {
            throw new UserNotFoundError(`User with ID ${id} not found.`);
        }

        // Update user in UserModel
        const updatedUser = await this.userModel.updateUser(id, user);

        // Compare and prepare differences if necessary
        const differences = findUpdateDifference(originalUser, updatedUser);

        return { original: originalUser, updated: differences };

        //return await this.userModel.updateUser(id, user);
    };

    public async deleteUser(id: number): Promise<{ message: string; status: 200 | 404 }> {
        try {
            await this.userModel.deleteUser(id);
            return { message: `User successfully deleted.`, status: 200 };
        } catch (error) {
            // Handle the case where the user does not exist or other errors
            // Assuming you throw a specific error for not found users in your UserModel
            if (error instanceof UserNotFoundError) {
                return { message: `User not found.`, status: 404 };
            }
            // For other errors, you might want to throw again, or handle differently
            throw error;
        }
    };

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await this.userModel.getUserByEmail(email);
        if (!user) {
            throw new Error(`User not found`);
        }

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) {
            throw new Error(`Invalid password`);
        }
        await this.userModel.updateLastLogin(user.id);
        const tokenOptions: jwt.SignOptions = {
            expiresIn: `120s`,
            algorithm: `HS256`, // Default algorithm
        };
        const token = signJwt(user.id, tokenOptions);
        return { user, token };
    };

    async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<{ message: string }> {
        const user = await this.userModel.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const passwordMatches = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!passwordMatches) {
            throw new Error('Invalid old password');
        }
        const hashedPassword =  hashPassword(newPassword);
        await this.userModel.changePassword(userId,  hashedPassword);
        return { message: 'Password updated successfully' };
    };
}