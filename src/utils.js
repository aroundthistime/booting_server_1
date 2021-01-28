import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import './env';

export const generateSecret = () => {
  const max = 999999;
  const min = 111111;
  const secret = Math.floor(Math.random() * (max - min + 1)) + min;
  return secret;
};

export const sendMail = async (email) => {
  const options = {
    service: 'Naver',
    host: 'stmp.naver.com',
    port: 587,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
  const client = nodemailer.createTransport(options);
  return client.sendMail(email);
};

export const sendSecretMail = async (address, secret) => {
  const email = {
    from: process.env.MAIL_ID,
    to: address,
    subject: '[부팅]인증 관련 메일입니다',
    text: `오른쪽 숫자 6자리를 입력해주세요 : ${secret}`,
  };
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
