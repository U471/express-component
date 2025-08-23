import nodemailer from 'nodemailer';
import { env } from '../config/index.js';
import logger from '../config/logger.js';

export const sendEmail = async ({ to, subject, html }) => {
  // If SMTP not configured, just log the email for dev convenience
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    logger.info('Email (mocked):', { to, subject });
    logger.info('HTML:', html);
    return { mocked: true };
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT || 587),
    secure: true,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS
    }
  });

  const info = await transporter.sendMail({
    from: `App <no-reply@${new URL(env.APP_URL).hostname}>`,
    to,
    subject,
    html
  });

  logger.info('Email sent', { messageId: info.messageId });
  return info;
};
