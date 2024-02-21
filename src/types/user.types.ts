import {UserRole} from "@prisma/client";

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
    socialLinks?: string;
    isActive: boolean;
    emailVerified: boolean;
    lastLogin: Date;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;

};

export type CreateUserDTO = Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'lastLogin' | 'role' | 'passwordHash' | 'emailVerified' | 'isActive'> & {
    passwordHash: string;
};
export type UpdateUserDTO = Partial<Omit<UserAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'role' | 'passwordHash' | 'isActive' | 'emailVerified'
>> & {
    password?: string; // Optional: only include when updating the password
};
export type userResponse = Pick<UserAttributes, 'id' | 'username' | 'email'>