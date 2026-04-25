import prisma from "../utils/prismaClient";
import {OrderModel} from "../models/order.model";

//const orederService = new OrderService(new OrderModel(prisma));

// const ownershipOrAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     const orderId = parseInt(req.params.id, 10);
//     const order = await orederService.getOrderById(orderId);
//
//     if (!order) {
//         return res.status(404).json({ error: 'Order not found' });
//     }
//
//     if (req.user && (order.userId === req.user.id || req.user.role === 'ADMIN')) {
//         req.order = order; // Attach order to request object for downstream use
//         next();
//     } else {
//         return res.status(403).json({ error: 'Not authorized.' });
//     }
// };