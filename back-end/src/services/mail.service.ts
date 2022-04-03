import { createTransport } from "nodemailer";
import * as dotenv from "dotenv"

export const sendMail = (to: string) => {
  dotenv.config();

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: String(process.env.G_USER),
      pass: String(process.env.G_PASS)
    }
  });
  const mailOptions = {
    from: String(process.env.G_USER),
    to: to,
    subject: 'Camagru verification',
    text: 'test text'
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });
}