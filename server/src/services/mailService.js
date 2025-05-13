import nodemailer from "nodemailer";
import { MAIL_PASS, MAIL_USER } from "../constant.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export async function sendEmail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: "MERN Auth System: <masaud@mail.com>",
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    console.log("Error sending email:", error);
  }
}
