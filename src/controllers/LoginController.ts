import { Request, Response } from 'express';
import ILogin from '../interfaces/LoginInterface';
import IToken from '../interfaces/TokenInterface';
import LoginService from '../services/LoginService';

require('express-async-errors');

export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public login = async (
    req: Request<unknown, unknown, ILogin>,
    res: Response<IToken>,
  ) => {
    const login = req.body;
    const token = await this.service.login(login);
    if (token) return res.status(200).json({ token });
  };
}
