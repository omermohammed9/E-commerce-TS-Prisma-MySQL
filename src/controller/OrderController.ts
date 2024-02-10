import { Request, Response } from 'express';
import OrderService from '../services/OrderService';
import prisma from '../utils/prismaClient';
import {Order, OrderModel} from "../models/order.model";

const orderModel = new OrderModel(prisma);
class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService(orderModel);
        this.getAllOrders = this.getAllOrders.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.updateOrder = this.updateOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    public async getAllOrders( req: Request, res: Response) {
        try {
            const orders: Order[] = await this.orderService.getAllOrders();
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
        const orderId = parseInt(req.params.id, 10);
        try {
            if (!isNaN(orderId)) {
                const order = await this.orderService.getOrderById(orderId);
            res.status(200).json(order);
            } else {
                res.status(400).json({ error: 'Invalid order id' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async createOrder(req: Request, res: Response) {
        try {
            const newOrder = await this.orderService.createOrder(req.body);
            res.status(201).json(newOrder);
        } catch (error : any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateOrder(req: Request, res: Response) {
        const orderId = parseInt(req.params.id, 10);
        try {
            if (!isNaN(orderId)) {
                const updatedOrder = await this.orderService.updateOrder(orderId, req.body);
                res.status(200).json(updatedOrder);
            } else {
                res.status(400).json({ error: 'Invalid order id' });
            }
        } catch (error : any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteOrder(req: Request, res: Response) {
        const orderId = parseInt(req.params.id, 10);
        try {
            if (!isNaN(orderId)) {
                const deletedOrder = await this.orderService.deleteOrder(orderId);
                res.status(200).json(deletedOrder);
            } else {
                res.status(400).json({ error: 'Invalid order id' });
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default OrderController;
