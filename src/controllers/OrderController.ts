import { Request, Response } from 'express';
import IOrder from '../interfaces/OrderInterface';
import IUser from '../interfaces/UserInterface';
import OrderService from '../services/OrderService';

require('express-async-errors');

interface CreateOrderRequest extends Request {
  user?: IUser
}
export default class OrderController {
  private service: OrderService;
  
  constructor() {
    this.service = new OrderService();
  }

  public getAllOrders = async (req: Request, res: Response<IOrder[]>) => {
    const orders = await this.service.getAllOrders();
    return res.status(200).json(orders);
  };

  public createOrder = async (
    req: CreateOrderRequest,
    res: Response,
  ) => {
    const { productsIds } = req.body;
    const userId = req.user?.id;
    if (userId) {
      const newOrder = await this.service.createOrder(userId, productsIds);
      return res.status(201).json(newOrder);
    }
  };
}
