import nodemailer from 'nodemailer'
import { TransportConfig } from '../types/types';



const emailConfig= ():TransportConfig =>{
    return{
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure:true,
        tls:{
            ciphers:"SSLv3"
        },
        requireTLS:true,
        connectionTimeout:10000,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    }
}


export const transport = nodemailer.createTransport(emailConfig());
