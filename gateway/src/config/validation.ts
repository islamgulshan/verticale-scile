import * as Joi from 'joi';
export const configValidationSchema = Joi.object({
  USER_SERVICE_PORT: Joi.number().required(),
  USER_SERVICE_HOST: Joi.string().required(),
  // POST_SERVICE_PORT: Joi.number().required(),
  // POST_SERVICE_HOST: Joi.string().required(),
  GATEWAY_PORT: Joi.number().required(),
});
