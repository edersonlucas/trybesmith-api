import connection from '../models/connection';
import UserModel from '../models/UserModel';
import ErrorGenerator from '../utils/ErrorGenerator';
import IUser from '../interfaces/UserInterface';
import Auth from '../utils/Auth';
import ILogin from '../interfaces/LoginInterface';

export default class LoginService {
  private model: UserModel;

  private auth: Auth;

  constructor() {
    this.model = new UserModel(connection);
    this.auth = new Auth();
  }

  private async userExist(
    user: ILogin,
  ): Promise<Omit<IUser, 'password'> | void> {
    const [userFound] = await this.model.findByUsernameAndPassword(user);
    if (userFound) {
      const { id, username, classe, level } = userFound;
      const payload = {
        id,
        username,
        classe,
        level,
      };
      return payload;
    }
  }

  public async login(
    user: ILogin,
  ): Promise<string> {
    const payload = await this.userExist(user);
    if (payload) {
      const token = this.auth.Authentication(payload);
      return token;
    }
    throw new ErrorGenerator(401, 'Username or password invalid');
  }
}