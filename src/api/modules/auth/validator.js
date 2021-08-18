/* eslint-disable no-useless-escape */
import Joi from 'joi';
import Validator from '../../core/Validator';

export default class AuthValidator extends Validator {
  payloadLogin = Joi.object({
    email: Joi.string()
      .email()
      .trim()
      .regex(/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z.]*$/)
      .label('Email invalidate')
      .required(),
    password: Joi.string()
      .trim()
      .regex(/^([a-zA-Z0-9._@#$%&]{6,32})(?!.*[\s]{1})+[^~<>'\"[\]|{}/;:*?.,!]*$/)
      .label('Password contains between 6 and 32 characters and without special characters')
      .required(),
  });
}
