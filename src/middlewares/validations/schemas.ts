import Joi from 'joi';

const createProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

const createUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});

const createOrderSchema = Joi.object({
  productsIds: Joi.array().min(1).items(Joi.number()).required()
    .messages({ 'array.min': '"productsIds" must include only numbers' }),
});

export {
  createProductSchema,
  createUserSchema,
  loginSchema,
  createOrderSchema,
}; 