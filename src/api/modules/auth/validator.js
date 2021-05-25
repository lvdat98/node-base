/* eslint-disable no-useless-escape */
import Joi from 'joi';
import Validator from '../../core/Validator';

export default class AuthValidator extends Validator {
  payloadRegister = Joi.object({
    // eslint-disable-next-line no-useless-escape
    username: Joi.string()
      .trim()
      .regex(/^(?!.*[\s]{2})+[^~<>'\"[\]|{}/;:*?.,!]*$/)
      .label(
        'Username must contain at least 2 characters and without special characters'
      )
      .required(),
    image: Joi.string(),
    email: Joi.string()
      .email()
      .trim()
      .regex(/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-z.]*$/)
      .label('Email invalidate')
      .required(),
    password: Joi.string()
      .trim()
      .regex(
        /^([a-zA-Z0-9._@#$%&]{6,32})(?!.*[\s]{1})+[^~<>'\"[\]|{}/;:*?.,!]*$/
      )
      .label(
        'Password contains between 6 and 32 characters and without special characters'
      )
      .required(),
  });

  payloadLogin = Joi.object({
    email: Joi.string()
      .email()
      .trim()
      .regex(/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+.[a-zA-Z.]*$/)
      .label('Email invalidate')
      .required(),
    password: Joi.string()
      .trim()
      .regex(
        /^([a-zA-Z0-9._@#$%&]{6,32})(?!.*[\s]{1})+[^~<>'\"[\]|{}/;:*?.,!]*$/
      )
      .label(
        'Password contains between 6 and 32 characters and without special characters'
      )
      .required(),
  });
}
