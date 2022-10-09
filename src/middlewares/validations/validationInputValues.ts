import { ValidationError } from 'joi';
import { createOrderSchema, createProductSchema, createUserSchema, loginSchema } from './schemas';
import IProduct from '../../interfaces/ProductInterface';
import ErrorGenerator from '../../utils/ErrorGenerator';
import IUser from '../../interfaces/UserInterface';
import ILogin from '../../interfaces/LoginInterface';

const returnError = (error: ValidationError | undefined) => {
  if (error) {
    if (error.message.includes('is required')) throw new ErrorGenerator(400, error.message);
    throw new ErrorGenerator(422, error.message);
  }
};

const validateCreateProduct = (newProduct: Omit<IProduct, 'id, orderId'>): void => {
  const { error } = createProductSchema
    .validate(newProduct);
  returnError(error);
};

const validateCreateUser = (newUser: Omit<IUser, 'id'>): void => {
  const { error } = createUserSchema
    .validate(newUser);
  returnError(error);
};

const validateLogin = (login: ILogin): void => {
  const { error } = loginSchema
    .validate(login);
  returnError(error);
};

const validateCreateOrder = (newOrder: { productId: number[] }): void => {
  const { error } = createOrderSchema
    .validate(newOrder);
  returnError(error);
};

export { validateCreateProduct, validateCreateUser, validateLogin, validateCreateOrder };