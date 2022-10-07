import connection from '../models/connection';
import ProductModel from '../models/ProductModel';
import IProduct from '../interfaces/ProductInterface';

export default class ProductService {
  private model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async createProduct(
    product: Omit<IProduct, 'id, orderId'>,
  ): Promise<Omit<IProduct, 'orderId'> | Error> {
    const newProductId = await this.model.createProduct(product);
    if (newProductId) return { ...product, id: newProductId };
    throw new Error('Unable to register new product');
  }
}
