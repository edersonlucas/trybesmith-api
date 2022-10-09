import { OkPacket, Pool, RowDataPacket } from 'mysql2/promise';
import IOrder from '../interfaces/OrderInterface';

export default class OrderModel {
  constructor(private connection: Pool) {
    this.connection = connection;
  }

  public async getAllOrders(): Promise<IOrder[]> {
    const [orders] = await this.connection.execute<(IOrder & RowDataPacket)[]>(
      `SELECT A.id, A.userId, JSON_ARRAYAGG(B.id) as productsIds 
      FROM Trybesmith.Orders as A 
      JOIN Trybesmith.Products as B 
      ON A.id = B.orderId GROUP BY A.id`);
    return orders;
  }

  public async createOrder(userId: number): Promise<number | undefined> {
    const [{ insertId }] = await this.connection.execute<OkPacket>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    return insertId; 
  }
}
