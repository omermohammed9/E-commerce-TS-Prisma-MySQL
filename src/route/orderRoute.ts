import express from 'express';
import auth from "../middleware/auth";
import { Container } from "inversify";
import { OrderController } from "../controller/OrderController";
import { TYPES } from "../types/types";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateOrderDTO, UpdateOrderDTO } from "../types/order.types";

export class orderRoute {
    public router: express.Router;
    private container: Container;

    constructor(container: Container) {
        this.container = container;
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        const orderController: OrderController = this.container.get<OrderController>(TYPES.Ordercontroller);
        this.router.post(`/createorder`, validationMiddleware(CreateOrderDTO), (req, res) => orderController.createOrder(req, res));
        this.router.get(`/getallorders`, auth, (req, res) => orderController.getAllOrders(req, res));
        this.router.get(`/getorderbyid/:id`, (req, res) => orderController.getOrderById(req, res));
        this.router.put(`/updateorder/:id`, validationMiddleware(UpdateOrderDTO), (req, res) => orderController.updateOrder(req, res));
        this.router.delete(`/delete/:id`, (req, res) => orderController.deleteOrder(req, res));
    }
}



