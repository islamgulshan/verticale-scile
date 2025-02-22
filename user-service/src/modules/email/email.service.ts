import {Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as env from "dotenv"
@Injectable()
export class EmailService {
    private transporter: Transporter;
    constructor(){
        env.config()
        this.transporter = nodemailer.createTransport({
          service: 'gmail', // Use 'gmail' instead of host
          auth: {
            user: process.env.EMAIL_FROM, // Your Gmail address
            pass: process.env.EMAIL_TOKEN, // App password
          }
        });
    }
   
    async sendMail(to: any, subject: string, text?: string, html?: string): Promise<void> {
      try {
       console.log(process.env.EMAIL_FROM,"abc")
        const mailOptions = {
          from: process.env.EMAIL_FROM, // Replace with your email
          to: to,
          subject: subject,
          text: text,
          html: html,
        };
        try {
          await this.transporter.sendMail(mailOptions);
        } catch (err) {
          console.log('email error', err);
        }
      } catch (error) {
          console.log("email error", error)
      }
    }
}
