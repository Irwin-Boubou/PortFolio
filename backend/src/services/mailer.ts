import nodemailer from 'nodemailer';
import { env } from '../config/env';

const transporter = env.smtp.host
  ? nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
    })
  : null;

/** Sends the contact-form email; silently no-ops if SMTP isn't configured (dev). */
export async function sendContactEmail(data: {
  name: string; email: string; subject?: string; message: string; locale: string;
}) {
  if (!transporter) {
    console.warn('[mailer] SMTP not configured, message stored in DB only.');
    return;
  }
  await transporter.sendMail({
    from: `"Portfolio Contact" <${env.smtp.user}>`,
    to: env.smtp.to,
    replyTo: data.email,
    subject: `[Portfolio] ${data.subject ?? 'New message'}, from ${data.name}`,
    text: `Language: ${data.locale}\nFrom: ${data.name} <${data.email}>\n\n${data.message}`,
  });
}
