import {adjectives, nouns} from "./words";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
import dotenv from "dotenv";
import path from "path";
dotenv.config({path : path.resolve(__dirname, ".env")});

export const generateSecret = () => {
    const randomAdjIndex = Math.floor(Math.random() * adjectives.length);
    const randomNounIndex = Math.floor(Math.random() * nouns.length);
    return `${adjectives[randomAdjIndex]} ${nouns[randomNounIndex]}`
}

export const sendMail = (email) => {
    const options = {
        auth : {
            api_key : process.env.MAILGUN_API,
            domain : process.env.MAILGUN_DOMAIN
        }
    }
    const client = nodemailer.createTransport(mgTransport(options));
    return client.sendMail(email);
}

export const sendSecretMail = async(address, secret) => {
    const email = {
        from : "aroundthistime@prisma.com",
        to : address,
        subject : "Secret key for Instagram Login 🔒",
        html : `<h4>Hello, your secret key is</h4><br><h2>${secret}</h2><br><h4>Copy paste on the web or app to log in</h4>`
    }
    return sendMail(email);
}