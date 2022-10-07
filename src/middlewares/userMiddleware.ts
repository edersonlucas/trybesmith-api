import { Request, Response, NextFunction } from 'express';
import IUser from '../interfaces/UserInterface';
import { validateCreateUser } from './validations/validationInputValues';

export default (
  req: Request<Omit<IUser, 'Id'>>,
  res: Response,
  next: NextFunction,
) => {
  validateCreateUser(req.body);
  next();
};