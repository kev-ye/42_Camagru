import { createTransport } from "nodemailer";
import * as dotenv from "dotenv"

export function sendMail (to: string, content: string, subject?: string) {
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
    subject: subject || 'Camagru verification',
    text: content
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });
}