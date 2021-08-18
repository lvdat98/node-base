import Joi from 'joi';

export default class Validator {
  idParam = Joi.object({
    id: Joi.string().required(),
  });

  queryParams = Joi.object({
    limit: Joi.number().integer().min(1).max(100).default(10),
    offset: Joi.number().integer().default(0),
    orderBy: Joi.string().default('-id'),
    fields: Joi.array(),
  });

  queryParamsAllowedAll = Joi.object({
    limit: Joi.number().integer().min(1).max(100).default(10).allow(-1),
    offset: Joi.number().integer().default(0),
    orderBy: Joi.string().default('-id'),
    filter: Joi.string(),
    fields: Joi.array(),
  });

  strPhoneNumber = Joi.string().regex(/^[0-9+ ]{10,11}$/);

  strEmail = Joi.string().email();

  strDate = Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/);

  payloadDeleteMultiple = {
    ids: Joi.array().items(Joi.number().integer()).required(),
  };

  string = Joi.string().max(255);

  number = Joi.number().min(-10000000000000).max(10000000000000);

  integer = Joi.number().integer().min(-10000000000000).max(10000000000000);

  objectIdParam = Joi.string();
}
