import { Request, Response, NextFunction } from 'express';
import ILogin from '../interfaces/LoginInterface';
import { validateLogin } from './validations/validationInputValues';

export default (
  req: Request<ILogin>,
  _res: Response,
  next: NextFunction,
) => {
  validateLogin(req.body);
  next();
};