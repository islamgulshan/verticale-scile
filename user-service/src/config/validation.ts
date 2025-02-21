import * as Joi from 'joi';

export const validationSchema = Joi.object({
  USER_SERVICE_PORT: Joi.number().required(),
  USER_SERVICE_HOST: Joi.string().required(),
});
