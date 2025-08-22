import Joi from 'joi';

export const signupSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const forgotSchema = Joi.object({
  email: Joi.string().email().required()
});

export const resetSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).max(128).required()
});
