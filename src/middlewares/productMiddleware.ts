import { Request, Response, NextFunction } from 'express';
import IProduct from '../interfaces/ProductInterface';
import { validateCreateProduct } from './validations/validationInputValues';

export default (
  req: Request<Omit<IProduct, 'Id, orderId'>>,
  res: Response,
  next: NextFunction,
) => {
  validateCreateProduct(req.body);
  next();
};