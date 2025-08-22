import { asyncHandler } from '../middlewares/asyncHandler.js';
import * as AuthService from '../services/auth.service.js';
import * as Valid from '../validations/auth.validation.js';
import { BadRequest } from '../utils/AppError.js';

export const signup = asyncHandler(async (req, res) => {
  const { error, value } = Valid.signupSchema.validate(req.body);
  if (error) throw BadRequest('Validation failed', { errors: error.details });
  const result = await AuthService.signup(value);
  res.status(201).json({ success: true, ...result });
});

export const login = asyncHandler(async (req, res) => {
  const { error, value } = Valid.loginSchema.validate(req.body);
  if (error) throw BadRequest('Validation failed', { errors: error.details });
  const result = await AuthService.login(value);
  res.json({ success: true, ...result });
});

export const forgot = asyncHandler(async (req, res) => {
  const { error, value } = Valid.forgotSchema.validate(req.body);
  if (error) throw BadRequest('Validation failed', { errors: error.details });
  const result = await AuthService.forgotPassword(value);
  res.json({ success: true, ...result });
});

export const reset = asyncHandler(async (req, res) => {
  const { error, value } = Valid.resetSchema.validate(req.body);
  if (error) throw BadRequest('Validation failed', { errors: error.details });
  const result = await AuthService.resetPassword(value);
  res.json({ success: true, ...result });
});
