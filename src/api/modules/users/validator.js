import Joi from 'joi';
import Validator from '../../core/Validator';

export default class UserValidator extends Validator {
  payloadCreateOne = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(25).required(),
  });

  payloadUpdateOne = Joi.object({
    fullname: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(25),
  });
}
