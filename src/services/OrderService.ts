import connection from '../models/connection';
import IOrder from '../interfaces/OrderInterface';
import OrderModel from '../models/OrderModel';

export default class OrderService {
  private model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAllOrders(): Promise<IOrder[]> {
    const orders = await this.model.getAllOrders();
    return orders;
  }
}