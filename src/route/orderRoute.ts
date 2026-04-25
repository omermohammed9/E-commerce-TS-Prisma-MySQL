import express from 'express';
import auth from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";
import { ownershipOrAdminMiddleware } from "../middleware/ownershipOrAdminMiddlewareOrder";
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
        
        this.router.post(`/createorder`, auth, validationMiddleware(CreateOrderDTO), (req, res) => orderController.createOrder(req, res));
        this.router.get(`/myorders`, auth, (req, res) => orderController.getMyOrders(req, res));
        this.router.get(`/getallorders`, auth, isAdmin, (req, res) => orderController.getAllOrders(req, res));
        this.router.get(`/getorderbyid/:id`, auth, ownershipOrAdminMiddleware, (req, res) => orderController.getOrderById(req, res));
        this.router.put(`/updateorder/:id`, auth, isAdmin, validationMiddleware(UpdateOrderDTO), (req, res) => orderController.updateOrder(req, res));
        this.router.delete(`/delete/:id`, auth, isAdmin, (req, res) => orderController.deleteOrder(req, res));
    }
}




