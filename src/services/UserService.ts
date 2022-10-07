import connection from '../models/connection';
import UserModel from '../models/UserModel';
import Auth from '../utils/Auth';
import IUser from '../interfaces/UserInterface';
import ErrorGenerator from '../utils/ErrorGenerator';

export default class ProductService {
  private model: UserModel;

  private auth: Auth;

  constructor() {
    this.model = new UserModel(connection);
    this.auth = new Auth();
  }

  public async createUser(
    user: Omit<IUser, 'id'>,
  ): Promise<string | ErrorGenerator> {
    const newUserId = await this.model.createUser(user);
    if (newUserId) {
      const { username, classe, level } = user;
      const payload = {
        id: newUserId,
        username,
        classe,
        level,
      };
      const token = this.auth.Authentication(payload);
      return token;
    }
    throw new ErrorGenerator(409, 'Unable to register new user');
  }
}
