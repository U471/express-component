import crypto from 'crypto';
import { User } from '../models/User.js';
import { PasswordResetToken } from '../models/PasswordResetToken.js';
import { BadRequest, Conflict, Unauthorized } from '../utils/AppError.js';
import { generateToken } from '../utils/generateToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import { env } from '../config/index.js';

export const signup = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw Conflict('Email already registered');
  const user = await User.create({ name, email, password });
  const token = generateToken(user);
  return { user: { id: user._id, name: user.name, email: user.email }, token };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw Unauthorized('Invalid credentials');
  const ok = await user.comparePassword(password);
  if (!ok) throw Unauthorized('Invalid credentials');
  const token = generateToken(user);
  return { user: { id: user._id, name: user.name, email: user.email }, token };
};

export const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) throw BadRequest('If this email exists, a reset link will be sent');
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 min
  await PasswordResetToken.create({ userId: user._id, token, expiresAt });

  const resetLink = `${env.APP_URL}/auth/reset?token=${token}`;
  await sendEmail({
    to: email,
    subject: 'Password reset',
    html: `<p>Hello ${user.name},</p>
           <p>Click the link to reset your password (valid 30 minutes):</p>
           <p><a href="${resetLink}">${resetLink}</a></p>`
  });
  return { message: 'If this email exists, a reset link will be sent' };
};

export const resetPassword = async ({ token, newPassword }) => {
  const record = await PasswordResetToken.findOne({ token });
  if (!record) throw BadRequest('Invalid or expired reset token');
  if (record.expiresAt < new Date()) throw BadRequest('Reset token expired');
  const user = await User.findById(record.userId);
  user.password = newPassword;
  await user.save();
  await PasswordResetToken.deleteMany({ userId: user._id });
  return { message: 'Password updated successfully' };
};
