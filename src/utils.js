import nodemailer from 'nodemailer';
import mgTransport from 'nodemailer-mailgun-transport';
import jwt from 'jsonwebtoken';
import { adjectives, nouns } from './words';
import './env';

export const generateSecret = () => {
  const randomAdjIndex = Math.floor(Math.random() * adjectives.length);
  const randomNounIndex = Math.floor(Math.random() * nouns.length);
  return `${adjectives[randomAdjIndex]} ${nouns[randomNounIndex]}`;
};

export const sendMail = (email) => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const client = nodemailer.createTransport(mgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = async (address, secret) => {
  const email = {
    from: 'aroundthistime@instaclone.com',
    to: address,
    subject: 'Secret key for Instagram Login 🔒',
    html: `Hello, your secret key is<br><h2>${secret}</h2><br>Copy paste on the web or app to log in`,
  };
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
