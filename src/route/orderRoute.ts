import { Router } from 'express';
import OrderController from '../controller/OrderController';
import auth from "../middleware/auth";

const router = Router();
const orderController = new OrderController();

router.get('/getallorders', auth,orderController.getAllOrders);
router.get('/getorderbyid/:id', orderController.getOrderById);
router.post('/createorder', orderController.createOrder);
router.put('/updateorder/:id', orderController.updateOrder);
router.delete('/delete/:id', orderController.deleteOrder);

export default router;
