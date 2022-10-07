import { Request, Response } from 'express';
import IOrder from '../interfaces/OrderInterface';
import OrderService from '../services/OrderService';

require('express-async-errors');

export default class OrderController {
  private service: OrderService;

  constructor() {
    this.service = new OrderService();
  }

  public getAllOrders = async (req: Request, res: Response<IOrder[]>) => {
    const orders = await this.service.getAllOrders();
    return res.status(200).json(orders);
  };
}