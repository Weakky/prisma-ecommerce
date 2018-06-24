import * as nodemailer from 'nodemailer';
import * as Email from 'email-templates';
import * as path from 'path';

const emailTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }
});

export const mailer = new Email({
  message: {
    from: process.env.EMAIL_FROM,
  },
  views: {
    root: path.join(__dirname, '../emails'),
  },
  transport: emailTransport,
  send: true,
});
