import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import orderMiddleware from '../middlewares/orderMiddleware';
import authorizationMiddleware from '../middlewares/authorizationMiddleware';

const router = Router();

const orderController = new OrderController();

router.get('/orders', orderController.getAllOrders);
router.post('/orders', authorizationMiddleware, orderMiddleware, orderController.createOrder);

export default router;