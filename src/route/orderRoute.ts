import express from 'express';
import auth from "../middleware/auth";
import {Container} from "inversify";
import {OrderController} from "../controller/OrderController";
import {TYPES} from "../types/types";


export class orderRoute {
    public router: express.Router;
    private container: Container;

    constructor(container: Container) {
        this.container = container;
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        const orderController = this.container.get<OrderController>(TYPES.OrderController);
        this.router.post('/createorder', (req, res)=> orderController.createOrder(req,res) );
        this.router.get('/getallorders', auth,(req,res)=>orderController.getAllOrders(req,res));
        this.router.get('/getorderbyid/:id', (req,res)=>orderController.getOrderById(req,res));
        this.router.put('/updateorder/:id', (req, res) => orderController.updateOrder(req, res));
        this.router.delete('/delete/:id', orderController.deleteOrder);
    }
}
// export class orderRoutes {
//     public router: express.Router;
//     private container: Container;
//     constructor(container: Container) {
//         this.container = container;
//         this.router = express.Router();
//         this.configureRoutes();
//     }
//     private configureRoutes(): void {
//         const orderController: OrderController = this.container.get<OrderController>(TYPES.OrderController);
//         this.router.post('/createorder', (req, res)=> orderController.createOrder(req,res) );
//         this.router.get('/getallorders', auth,(req,res)=>orderController.getAllOrders(req,res));
//         this.router.get('/getorderbyid/:id', (req,res)=>orderController.getOrderById(req,res));
//         this.router.put('/updateorder/:id', (req, res) => orderController.updateOrder(req, res));
//         this.router.delete('/delete/:id', orderController.deleteOrder);
//     }
// }



// const router = Router();
// const orderController = new OrderController();
//
// router.get('/getallorders', auth,orderController.getAllOrders);
// router.get('/getorderbyid/:id', orderController.getOrderById);
// router.post('/createorder', orderController.createOrder);
// router.put('/updateorder/:id', orderController.updateOrder);
// router.delete('/delete/:id', orderController.deleteOrder);
//
// export default router;
