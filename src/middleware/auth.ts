import {NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient";
import {getTokenFromHeaders} from "../utils/getToken";
import {HttpException, httpStatus} from "node-http-exceptions";
import {verifyJwt} from "../utils/jwt";

interface JwtPayload {
    id: number;
}

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = getTokenFromHeaders(req);
    if (!token) {
        return next(new HttpException(httpStatus.UNAUTHORIZED, 'Access token is required'));
    }
    try {
        const decoded = verifyJwt(token) as JwtPayload;
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            return next(new HttpException(403, 'User not found'));
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(new HttpException(403, 'Invalid or expired token'));
        } else {
            console.error(error);
            next(new HttpException(500, 'Internal server error'));
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