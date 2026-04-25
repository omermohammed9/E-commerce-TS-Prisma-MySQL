import { Request, Response, NextFunction } from 'express';
import { HttpException } from 'node-http-exceptions';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(new HttpException(401, 'Authentication required'));
    }

    if (req.user.role !== 'ADMIN') {
        return next(new HttpException(403, 'Admin privileges required'));
    }

    next();
};
