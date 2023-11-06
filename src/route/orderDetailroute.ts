import { Router } from 'express';
import OrderDetailController from '../controller/OrderDetailController';

const router = Router();
const orderDetailController = new OrderDetailController();

router.get('/getorderdetails/:orderId', orderDetailController.getOrderDetails);
router.post('/addorderdetail', orderDetailController.addOrderDetail);
router.put('/updateorderdetail/:id', orderDetailController.updateOrderDetail);
router.delete('/deleteorderdetail/:id', orderDetailController.deleteOrderDetail);

export default router;
