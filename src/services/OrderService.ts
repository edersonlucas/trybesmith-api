import connection from '../models/connection';
import IOrder from '../interfaces/OrderInterface';
import OrderModel from '../models/OrderModel';
import ProductModel from '../models/ProductModel';
import IProduct from '../interfaces/ProductInterface';
import ErrorGenerator from '../utils/ErrorGenerator';

export default class OrderService {
  private modelOrder: OrderModel;

  private modelProduct: ProductModel;

  constructor() {
    this.modelOrder = new OrderModel(connection);
    this.modelProduct = new ProductModel(connection);
  }

  public async getAllOrders(): Promise<IOrder[]> {
    const orders = await this.modelOrder.getAllOrders();
    return orders;
  }

  private async someProductIdExists(productsIds: number[]) {
    const productsFoundByIds: IProduct[] = await this.modelProduct.getProductsByIds(productsIds);
    if (!productsFoundByIds.length) {
      throw new ErrorGenerator(404, 'No products from the list found');
    }
  }

  public async createOrder(userId: number, productsIds: number[]) {
    await this.someProductIdExists(productsIds);
    const orderId = await this.modelOrder.createOrder(userId);
    if (orderId) {
      const updatedProducts = await Promise.all(
        productsIds.map((productId) => this.modelProduct.updateProductById(productId, orderId)),
      );
      return {
        userId,
        productsIds: updatedProducts.filter((productId) => productId),
      };
    }
  }
}