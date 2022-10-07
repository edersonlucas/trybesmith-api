import { Pool, OkPacket } from 'mysql2/promise';
import IUser from '../interfaces/UserInterface';

export default class UserModel {
  constructor(private connection: Pool) {
    this.connection = connection;
  }

  public async createUser(
    user: Omit<IUser, 'id'>,
  ): Promise<number | void> {
    const [{ insertId }] = await this.connection.execute<OkPacket>(
      `INSERT INTO Trybesmith.Users
            (username, classe, level, password)
        VALUES
            (?, ?, ?, ?)`,
      [user.username, user.classe, user.level, user.password],
    );
    return insertId;
  }
}