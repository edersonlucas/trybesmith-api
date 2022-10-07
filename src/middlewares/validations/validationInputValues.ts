import { createProductSchema, createUserSchema } from './schemas';
import IProduct from '../../interfaces/ProductInterface';
import ErrorGenerator from '../../utils/ErrorGenerator';
import IUser from '../../interfaces/UserInterface';

const validateCreateProduct = (newProduct: Omit<IProduct, 'id, orderId'>): void => {
  const { error } = createProductSchema
    .validate(newProduct);
  if (error) {
    if (error.message.includes('is required')) throw new ErrorGenerator(400, error.message);
    throw new ErrorGenerator(422, error.message);
  }
};

const validateCreateUser = (newUser: Omit<IUser, 'id'>): void => {
  const { error } = createUserSchema
    .validate(newUser);
  if (error) {
    if (error.message.includes('is required')) throw new ErrorGenerator(400, error.message);
    throw new ErrorGenerator(422, error.message);
  }
};

export { validateCreateProduct, validateCreateUser };