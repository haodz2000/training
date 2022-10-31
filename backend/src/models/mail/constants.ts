import * as dotenv from 'dotenv';

dotenv.config();

export const mailConstants = {
  host: process.env.MAIL_SERVER,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USERNAME,
  pass: process.env.MAIL_PASS,
  urlForgotPasswrod: process.env.URL_FORGOTPASS_API,
};
