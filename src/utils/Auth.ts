import Jwt from 'jsonwebtoken';
import IUser from '../interfaces/UserInterface';
import ErrorGenerator from './ErrorGenerator';

export default class Auth {
  private privateKey: string;

  constructor() {
    this.privateKey = process.env.JWT_SECRET as string;
  }

  public Authentication(user: Omit<IUser, 'password'>) {
    const token = Jwt.sign(user, this.privateKey);
    return token;
  }

  public Authorization(token: string) {
    try {
      const user = Jwt.verify(token, this.privateKey);
      return user;
    } catch (err) {
      throw new ErrorGenerator(401, 'Invalid token');
    }
  }
}