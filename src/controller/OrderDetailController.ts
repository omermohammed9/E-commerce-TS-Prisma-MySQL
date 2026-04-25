import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { IOrderDetailService } from "../interfaces/IOrderDetailService";
import { TYPES } from "../types/types";

@injectable()
export class OrderDetailController {
    private orderDetailService: IOrderDetailService;

    constructor(@inject(TYPES.IOrderDetailService) orderDetailService: IOrderDetailService) {
        this.orderDetailService = orderDetailService;
    }

    public async getOrderDetails(req: Request, res: Response) {
        try {
            const orderId = parseInt(req.params.orderId || `not a number`, 10);
            if (!isNaN(orderId)) {
                const orderDetails = await this.orderDetailService.getOrderDetails(orderId);
                res.status(200).json(orderDetails);
            } else {
                res.status(400).json({ error: 'Invalid order ID' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getOrderDetailById(req: Request, res: Response) {
        try {
            const orderDetailId = parseInt(req.params.id || `not a number`, 10);
            if (!isNaN(orderDetailId)) {
                const orderDetail = await this.orderDetailService.getOrderDetailById(orderDetailId);
                res.status(200).json(orderDetail);
            } else {
                res.status(400).json({ error: 'Invalid order detail ID' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async addOrderDetail(req: Request, res: Response) {
        try {
            const newOrderDetail = await this.orderDetailService.addOrderDetail(req.body);
            res.status(201).json(newOrderDetail);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateOrderDetail(req: Request, res: Response) {
        try {
            const orderDetailId = parseInt(req.params.id || `not a number`, 10);
            if (!isNaN(orderDetailId)) {
                const updatedOrderDetail = await this.orderDetailService.updateOrderDetail(orderDetailId, req.body);
                res.status(200).json(updatedOrderDetail);
            } else {
                res.status(400).json({ error: 'Invalid order detail ID' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteOrderDetail(req: Request, res: Response) {
        try {
            const orderDetailId = parseInt(req.params.id || `not a number`, 10);
            if (!isNaN(orderDetailId)) {
                await this.orderDetailService.deleteOrderDetail(orderDetailId);
                res.status(204).send();
            } else {
                res.status(400).json({ error: 'Invalid order detail ID' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default OrderDetailController;

