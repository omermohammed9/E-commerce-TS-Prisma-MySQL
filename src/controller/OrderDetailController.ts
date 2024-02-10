import { Request, Response } from 'express';
import OrderDetailService from '../services/OrderDetailService';
import prisma from "../utils/prismaClient";
import {OrderDetailModel} from "../models/orderDetail.model";


const orderDetailModel = new OrderDetailModel(prisma);

class OrderDetailController {
    private orderDetailService: OrderDetailService;

    constructor() {
        this.orderDetailService = new OrderDetailService(orderDetailModel);
    }

    public async getOrderDetails(req: Request, res: Response) {
        try {
            const orderId = parseInt(req.params.orderId, 10); // Convert orderId to a number using base 10
            if (!isNaN(orderId)) {
                const orderDetails = await this.orderDetailService.getOrderDetails(orderId);
                res.status(200).json(orderDetails);
            } else {
                // If orderId is not a number, send a bad request response
                res.status(400).json({error: 'Invalid order ID'});
            }
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    public async getOrderDetailById(req: Request, res: Response) {
        try {
            const orderDetailId = parseInt(req.params.id, 10); // Convert orderId to a number using base 10
            if (!isNaN(orderDetailId)) {
                const orderDetail = await this.orderDetailService.getOrderDetailById(orderDetailId);
                res.status(200).json(orderDetail);
            } else {
                // If orderId is not a number, send a bad request response
                res.status(400).json({error: 'Invalid order detail ID'});
            }
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
    public async addOrderDetail(req: Request, res: Response) {
        try {
            const newOrderDetail = await this.orderDetailService.addOrderDetail(req.body);
            res.status(201).json(newOrderDetail);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    public async updateOrderDetail(req: Request, res: Response) {
        try {
            const orderDetailId = parseInt(req.params.id, 10); // Convert id to a number using base 10
            if (!isNaN(orderDetailId)) {
                // Assuming `updateOrderDetail` expects an object with the order detail's ID and the update data
                // Validate and/or transform req.body here as needed before passing to the service

                const updateData = {
                    ...req.body // This should be the data you want to update
                };

                // Depending on your service implementation, you might need to validate or transform updateData here
                const updatedOrderDetail = await this.orderDetailService.updateOrderDetail(orderDetailId, updateData);
                res.status(200).json(updatedOrderDetail);
            } else {
                // If orderDetailId is not a number, send a bad request response
                res.status(400).json({error: 'Invalid order detail ID'});
            }
        } catch (error: any) {
            // You might want to log the error or handle it based on its type
            res.status(500).json({error: error.message});
        }
    }

    public async deleteOrderDetail(req: Request, res: Response) {
        try {
            const orderDetailId = parseInt(req.params.id, 10); // Convert id to a number using base 10
            if (!isNaN(orderDetailId)) {
                await this.orderDetailService.deleteOrderDetail(orderDetailId);
                res.status(204).send(); // No Content
            } else {
                // If orderDetailId is not a number, send a bad request response
                res.status(400).json({error: 'Invalid order detail ID'});
            }
        } catch (error: any) {
            // You might want to log the error or handle it based on its type
            res.status(500).json({error: error.message});
        }
    }
}
export default OrderDetailController;
