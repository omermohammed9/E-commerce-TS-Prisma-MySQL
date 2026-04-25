import express from 'express';
import { OrderDetailController } from '../controller/OrderDetailController';
import { TYPES } from "../types/types";
import { Container } from "inversify";

export class orderDetailRoutes {
    public router: express.Router;
    private container: Container;

    constructor(container: Container) {
        this.container = container;
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        const orderDetailController = this.container.get<OrderDetailController>(TYPES.OrderDetailController);
        this.router.get('/getorderdetails/:orderId', (req, res) => orderDetailController.getOrderDetails(req, res));
        this.router.get('/getorderdetailbyid/:id', (req, res) => orderDetailController.getOrderDetailById(req, res));
        this.router.post('/addorderdetail', (req, res) => orderDetailController.addOrderDetail(req, res));
        this.router.put('/updateorderdetail/:id', (req, res) => orderDetailController.updateOrderDetail(req, res));
        this.router.delete('/deleteorderdetail/:id', (req, res) => orderDetailController.deleteOrderDetail(req, res));
    }
}

