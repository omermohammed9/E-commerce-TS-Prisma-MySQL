import { Request, Response } from 'express';
import {inject, injectable} from "inversify";
import {TYPES} from "../types/types";
import {IOrderService} from "../interfaces/IOrderService";
import {findUpdateDifference} from "../utils/findUpdateDifference";

@injectable()
export class OrderController {
    constructor(@inject(TYPES.IOrderService) private orderService: IOrderService) {};

    public async createOrder(req: Request, res: Response) {
        try {
            const newOrder = await this.orderService.createOrder(req.body);
            res.status(201).json(newOrder);
        } catch (error : any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getAllOrders( req: Request, res: Response) {
        try {
            const orders = await this.orderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error: Response | any) {
            // Just log the error and send a 500 status code
            console.error(error.message);
            if (!res.headersSent) {
                res.status(500).json({ error: error.message });
            }
        }
    }

    public async getOrderById(req: Request, res: Response) {
        //const orderId = parseInt(req.params.id || `not a number`, 10);
        const orderId = Number(req.params.id);
        try {
            if (!isNaN(orderId)) {
                const order = await this.orderService.getOrderById(orderId);
            res.status(200).json(order);
            } else {
                res.status(400).json({ error: `Invalid order id` });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateOrder(req: Request, res: Response): Promise<void> {
        //const orderId = parseInt(req.params.id || `not a number`, 10);
        const orderId = Number(req.params.id);

        // Validate orderId early to return a clear error message.
        if (isNaN(orderId)) {
            res.status(400).json({ error: 'Invalid order ID provided' });
            return;
        }

        try {
            const { original, updated } = await this.orderService.updateOrder(orderId, req.body);

            // Check if the order was found and updated successfully.
            if (!original || !updated) {
                res.status(404).json({ error: 'Order not found' });
                return;
            }

            // Calculate differences between the original and updated order.
            const changes = findUpdateDifference(original, updated);

            // Respond with a success message and the details of the update.
            res.status(200).json({
                message: 'Order updated successfully',
                details: {
                    original,
                    updated,
                    changes,
                },
            });
        } catch (error: unknown) {
            // Handle unexpected errors more safely.
            const errorMessage = error instanceof Error ? error.message : `An unknown error occurred`;
            res.status(500).json({ error: errorMessage });
        }
    }


    public async deleteOrder(req: Request, res: Response) {
        //const orderId = parseInt(req.params.id ||`not a number`, 10);
        const orderId = Number(req.params.id);
        try {
            if (!isNaN(orderId)) {
                const deletedOrder = await this.orderService.deleteOrder(orderId);
                res.status(200).json(deletedOrder);
            } else {
                res.status(400).json({ error: `Invalid order id` });
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

