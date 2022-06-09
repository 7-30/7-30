// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { response } = req.body;

  if (!response) {
    return res.status(403).json({ message: 'Not allowed.' });
  }

  const nodemailer = require('nodemailer');
  const transporterConfig = {
    port: process.env.MAIL_PORT,
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
    secure: true
  };
  const transporter = nodemailer.createTransport(transporterConfig);

  const mailData = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: `7-30 | Disruptive education = ?`,
    html: response
  };

  let success: boolean = true;
  let error: string;
  return await transporter.sendMail(mailData, (err: any, info: any) => {
    if (err) {
      success = false;
      console.log(err);
    }

    return res.status(200).json({ success, error });
  });
}
