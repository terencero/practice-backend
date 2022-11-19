import { createTransport, getTestMessageUrl } from 'nodemailer';
import 'dotenv/config';
import { SentMessageInfo } from 'nodemailer/lib/smtp-connection';
import SMTPTransport = require('nodemailer/lib/smtp-transport');

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as SMTPTransport.Options);

function makeANiceEmail(text: string): string {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>😀, TRo</p>
    </div>
  `;
}

export async function sendPassworResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info: Promise<SentMessageInfo> = await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`
      Your Password Reset Token is here!

      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">click here to reset</a>
    `),
  });

  if (process.env.MAIL_HOST.includes('ethereal.email')) {
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `💌 Message Sent! Preview it at ${getTestMessageUrl(
        (info as unknown) as SMTPTransport.SentMessageInfo
      )}`
    );
  }
}
