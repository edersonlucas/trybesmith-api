import { Request, Response } from 'express';
import IUser from '../interfaces/UserInterface';
import UserService from '../services/UserService';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }
  
  public createUser = async (req: Request<Omit<IUser, 'Id'>>, res: Response) => {
    const user = req.body;
    const token = await this.service.createUser(user);
    return res.status(201).json({ token });
  };
}