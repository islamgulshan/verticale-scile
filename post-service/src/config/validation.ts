import * as Joi from 'joi';

export const validationSchema = Joi.object({
  POST_SERVICE_PORT: Joi.number().required(),
  POST_SERVICE_HOST: Joi.string().required(),
});
