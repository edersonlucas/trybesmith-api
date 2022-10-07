import { Pool, OkPacket, RowDataPacket } from 'mysql2/promise';
import ILogin from '../interfaces/LoginInterface';
import IUser from '../interfaces/UserInterface';

export default class UserModel {
  constructor(private connection: Pool) {
    this.connection = connection;
  }

  public async createUser(user: Omit<IUser, 'id'>): Promise<number | void> {
    const [{ insertId }] = await this.connection.execute<OkPacket>(
      `INSERT INTO Trybesmith.Users
            (username, classe, level, password)
        VALUES
            (?, ?, ?, ?)`,
      [user.username, user.classe, user.level, user.password],
    );
    return insertId;
  }

  public async findByUsernameAndPassword(
    user: ILogin,
  ): Promise<Omit<IUser, 'id, orderId, classe, level'>[]> {
    const [userFound] = await this.connection.execute<(IUser & RowDataPacket)[]
    >('SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?', [
        user.username,
        user.password,
      ]);
    return userFound;
  }
}
