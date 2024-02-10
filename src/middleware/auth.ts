import 'dotenv/config';
import {NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient";
import {config} from "dotenv";

interface JwtPayload {
    id: number;
}

config({ path: './src/.env' });
const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
    console.error('JWT_SECRET is not defined. Make sure you have set it in your .env file.');
    process.exit(1); // Exit the process if the JWT_SECRET is not defined.
}

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization; // Assuming 'Bearer TOKEN'
    if (!token) {
        return res.status(401).send('Access token is required');
    }
    try {
        const decoded = jwt.verify(token, SECRET) as JwtPayload;
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            return res.status(403).send('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).send('Invalid or expired token');
        } else {
            // Log the error internally and return a generic error message
            console.error(error);
            return res.status(500).send('Internal server error');
        }
    }
};

export default authenticateToken;


// const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//     // Retrieve token from the authorization header
//     const token = req.headers.authorization
//     console.log(req.headers);
//     if (token == null) return res.sendStatus(401); // if there isn't any token
//     console.log(token);
//
//     jwt.verify(token, '9mh0u9wsql5w5y', (error: any, user: any) => {
//         console.log(error);
//         if (error) return res.sendStatus(403); // if the token has expired or is invalid
//         const userfind = prisma.user.findUnique({
//             where: { id: user.id },
//         });
//         console.log(userfind);
//         if (!userfind) return res.sendStatus(403);
//         req.user = userfind;
//         next(); // proceed to the next middleware function
//     });
// };
// export default authenticateToken;