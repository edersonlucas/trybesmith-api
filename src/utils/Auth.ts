import Jwt from 'jsonwebtoken';
import IUser from '../interfaces/UserInterface';

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
    Jwt.verify(token, this.privateKey);
  }
}