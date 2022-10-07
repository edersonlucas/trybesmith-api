import createProductSchema from './schemas';
import IProduct from '../../interfaces/ProductInterface';
import ErrorGenerator from '../../utils/ErrorGenerator';

const validateCreateProduct = (newProduct: Omit<IProduct, 'id, orderId'>): void => {
  const { error } = createProductSchema
    .validate(newProduct);
  if (error) {
    if (error.message.includes('is required')) throw new ErrorGenerator(400, error.message);
    throw new ErrorGenerator(422, error.message);
  }
};

export default validateCreateProduct;