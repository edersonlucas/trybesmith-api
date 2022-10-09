import { Request, Response, NextFunction } from 'express';
import { validateCreateOrder } from './validations/validationInputValues';

export default (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  validateCreateOrder(req.body);
  next();
};