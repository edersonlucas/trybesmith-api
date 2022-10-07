import Joi from 'joi';

const createProductSchema = Joi.object({
  name: Joi.required(),
  amount: Joi.required(),
});

export default createProductSchema; 