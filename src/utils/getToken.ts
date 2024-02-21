import {Request} from "express";

export const getTokenFromHeaders = (req: Request): string | null => {
    const header = req.headers.authorization || null;
    if (!header) return null;
    // const parts = header.split(' ');
    // if (parts.length < 2) return null;
    return header.split(' ')[1] || null; // Assumes 'Bearer TOKEN'

}