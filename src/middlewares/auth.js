import jwt from 'jsonwebtoken';
import { env } from '../config/index.js';
import { Unauthorized } from '../utils/AppError.js';

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) return next(Unauthorized('JWT token missing'));

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    next(Unauthorized('Invalid or expired token'));
  }
};
