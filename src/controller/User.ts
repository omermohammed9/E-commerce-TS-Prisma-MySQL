import { Request, Response } from 'express';
import {PrismaClient, User,} from '@prisma/client';
import {hashPassword} from "../utils/passwordUtils";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {extractUserVariables, extractUserUpdateVariables} from "./variables";
import {signJwt} from "../utils/jwt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
   // const userVariables = extractUserVariables(req.body);
    try {
        const { password, ...restOfUserVariables } = extractUserVariables(req.body);
        const passwordHash = hashPassword(password);
        const user = await prisma.user.create({
            data: {
                ...restOfUserVariables,
                passwordHash,
            },
        });
        const tokenOptions: jwt.SignOptions = {
            expiresIn: '60s',
            //issuer: 'Tsc-Prisma-MySQL',
            algorithm: 'HS256', // Default algorithm
        };
        const generateJWT = signJwt(user.id, tokenOptions);
        console.log(generateJWT);
        res.json({
            user,
            token: generateJWT
        });

    } catch (error: any) {
        res.status(500).send(error.message);
    }
};
export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {email},
        });
        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) {
            res.status(401).json({message: 'Invalid password'});
            return;
        }
        const generateJWT = signJwt(user.id);
        res.json({user, token: generateJWT});
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users : User[] = await prisma.user.findMany();
        res.json(users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        if (!user) {
            res.status(404).send(`User with ID ${id} not found`);
        }
    } catch (error: any) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            return res.status(404).send(`User with ID ${id} not found`);
        }
        return res.status(500).send(error.message);
    }
};


export const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    //const id = parseInt(userId, 10);
    const userVariables = extractUserUpdateVariables(req.body);
    try {
        if (isNaN(Number(id))) {
            res.status(400).json({ message: 'Invalid user ID format' });
            return;
        }
        const { password, ...restOfUserVariables } = userVariables;
        const updateData = {
            ...restOfUserVariables,
            ...(password && { passwordHash: hashPassword(password) }) // Conditionally add passwordHash if password is provided
        };

        const user: User = await prisma.user.update({
            where: { id: Number(id) },
            data: updateData,
        });
        res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred." });
        }
    }
};


export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const softDelete = req.query.softDelete === 'true';  // Check if softDelete query parameter is set to true

    try {
        let user;
        if (softDelete) {
            // Soft delete: Update the user's isActive field to false instead of deleting the record
            user = await prisma.user.update({
                where: { id: Number(id) },
                data: { isActive: false },
            });
        } else {
            // Hard delete: Completely remove the user record from the database
            user = await prisma.user.delete({
                where: { id: Number(id) },
            });
        }
        res.json(user);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            // Handle the case where the user does not exist
            res.status(404).send(`User with ID ${id} not found`);
        } else {
            // Handle other kinds of errors
            // @ts-ignore
            res.status(500).send(error.message);
        }
    }
};




