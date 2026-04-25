import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prismaClient";
import { HttpException } from "node-http-exceptions";

export const ownershipOrAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = parseInt(req.params.id, 10);
    
    if (isNaN(orderId)) {
        return next(new HttpException(400, 'Invalid order ID'));
    }

    const order = await prisma.order.findUnique({
        where: { id: orderId }
    });

    if (!order) {
        return next(new HttpException(404, 'Order not found'));
    }

    if (req.user && (order.userId === req.user.id || req.user.role === 'ADMIN')) {
        req.order = order; // Attach order to request object for downstream use
        next();
    } else {
        return next(new HttpException(403, 'Not authorized to access this order'));
    }
};