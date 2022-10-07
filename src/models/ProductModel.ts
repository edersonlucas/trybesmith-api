import { Pool, OkPacket, RowDataPacket } from 'mysql2/promise';
import IProduct from '../interfaces/ProductInterface';

export default class ProductModel {
  constructor(private connection: Pool) {
    this.connection = connection;
  }

  public async createProduct(
    product: Omit<IProduct, 'id, orderId'>,
  ): Promise<number | null> {
    const [{ insertId }] = await this.connection.execute<OkPacket>(
      `INSERT INTO Trybesmith.Products
          (name, amount)
      VALUES
          (?, ?)`,
      [product.name, product.amount],
    );
    return insertId;
  }

  public async getAllProducts(): Promise<IProduct[]> {
    const [products] = await this.connection.execute<(IProduct & RowDataPacket)[]>(
      'SELECT * FROM Trybesmith.Products');
    return products;
  }
}