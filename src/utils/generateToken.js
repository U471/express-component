import jwt from 'jsonwebtoken';
import { env } from '../config/index.js';

export const generateToken = (user) => {
  const payload = { id: user._id, email: user.email, name: user.name };
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};
