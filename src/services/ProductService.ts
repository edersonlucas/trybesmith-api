import connection from '../models/connection';
import ProductModel from '../models/ProductModel';
import IProduct from '../interfaces/ProductInterface';
import ErrorGenerator from '../utils/ErrorGenerator';

export default class ProductService {
  private model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async createProduct(
    product: Omit<IProduct, 'id, orderId'>,
  ): Promise<Omit<IProduct, 'orderId'> | ErrorGenerator> {
    const newProductId = await this.model.createProduct(product);
    if (newProductId) return { ...product, id: newProductId };
    throw new ErrorGenerator(409, 'Unable to register new product');
  }

  public async getAllProducts(): Promise<IProduct[]> {
    const products = await this.model.getAllProducts();
    return products;
  }
}
