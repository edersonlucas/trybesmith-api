import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const router = Router();

const orderController = new OrderController();

router.get('/orders', orderController.getAllOrders);

export default router;