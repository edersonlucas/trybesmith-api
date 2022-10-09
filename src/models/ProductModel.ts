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

  public async getProductsByIds(productIds: number[]): Promise<IProduct[]> {
    const quantityIds: string = productIds
      .reduce((acc: string[], _productId) => [...acc, '?'], []).join(', ');
    const [product] = await this.connection.execute<(
    IProduct & RowDataPacket)[]>(
      `SELECT * FROM Trybesmith.Products WHERE id IN (${quantityIds})`,
      [...productIds],
      );
    return product;
  }

  public async updateProductById(productId: number, orderId: number) {
    const [{ changedRows }] = await this.connection.execute<OkPacket>(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [orderId, productId],
    );
    if (changedRows) return productId;
  }
}