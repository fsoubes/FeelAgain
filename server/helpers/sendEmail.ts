import { __prod__ } from "../constant/constant";
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string | string[], html: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  /* let testAccount = await nodemailer.createTestAccount();
  console.log("testAccount", testAccount); */

  const options = __prod__
    ? {
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      }
    : {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.NODEMAILER_DEV_MAIL, // generated ethereal user
          pass: process.env.NODEMAILER_DEV_PASS, // generated ethereal password
        },
      };

  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport(options);

  /*  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_DEV_MAIL, // generated ethereal user
      pass: process.env.NODEMAILER_DEV_PASSWORD, // generated ethereal password
    },
  }); */

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.GMAIL_USER, // sender address
    to: to, // list of receivers
    subject: "Change password", // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
